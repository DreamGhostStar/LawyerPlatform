'use strict';

const Service = require('egg').Service;
const fs = require('fs');
const path = require('path');
const qiniu = require('qiniu');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const md5 = require('md5');
const bucket = 'lawyer-test'; // 要上传的空间名
const imageUrl = 'lawyer.youchen-blog.cn'; // 空间绑定的域名
const accessKey = 'nzxCQpB1wc9C-T_XPAIHqs_gGi_itNepD6hHfmew'; // Access Key
const secretKey = 'eaK7aWcWCywrx6Qm25-HaOvTB_AMnW-q2JIntYqk'; // Secret Key
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: bucket,
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;

class UploadFileService extends Service {

  /**
   * @description 上传文件（图片）到七牛云
   * @return {object} 返回信息
   * @memberof UploadFileService
   */
  async uploadFiles() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const filename = md5(stream.filename) + path.extname(stream.filename).toLocaleLowerCase();
    const localFilePath = path.join(__dirname, '../public/uploads', filename);
    const writeStream = fs.createWriteStream(localFilePath);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
      const formUploader = new qiniu.form_up.FormUploader(config);
      const putExtra = new qiniu.form_up.PutExtra();
      const imgSrc = await new Promise((resolve, reject) => {
        formUploader.putFile(
          uploadToken,
          filename,
          localFilePath,
          putExtra,
          (respErr, respBody, respInfo) => {
            if (respErr) {
              reject(new Error('上传失败'));
            }
            if (respInfo.statusCode === 200) {
              resolve(imageUrl + respBody.key);
            } else {
              reject(new Error('上传失败'));
            }

            fs.unlinkSync(localFilePath); // 上传之后删除本地文件
          }
        );
      });
      if (imgSrc !== '') {
        return ctx.retrunInfo(0, `http://${imgSrc}`, '上传成功');
      }

      return ctx.retrunInfo(-1, '', '如果出现这种返回样式，请联系后端查找bug');
    } catch (err) {
      await sendToWormhole(stream); // 如果出现错误，关闭管道
      return ctx.retrunInfo(-1, '', err.message);
    }
  }

  async downloadFile() {
    const { ctx, service } = this;
    const query = ctx.query;
    const arr = [ null, 'agency_word', 'final_report' ];
    const law = await service.law.getWordUrl(parseInt(query.law_id), arr[query.type]);
    return ctx.retrunInfo(0, law, '');
  }
}

module.exports = UploadFileService;
