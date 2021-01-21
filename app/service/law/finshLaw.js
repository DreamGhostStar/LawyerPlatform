'use strict';

const Service = require('egg').Service;
const http = require('http')
const path = require('path')
const fs = require('fs')
const mammoth = require("mammoth");

class FinshLawService extends Service {
  /**
   * @description 完成结案请求
   * @param {number} caseID
   * @param {object} agency_word
   * @param {object} finish_word
   * @param {object} reling_request
   * @return {object} 响应详情
   * @memberof RemoveMessageService
   */
  async finishLaw(caseID, agency_word, finish_word, reling_request) {
    const { ctx } = this
    let transaction;
    try {
      transaction = await ctx.model.transaction();
      let finishRequest; // 插入结案文书表后的结果
      let resultRequestRes; // 插入归档请求表后的结果
      let agencyWordRes; // 插入代理词表后的结果
      let lawInfo; // 案件详情
      // 插入结案文书表
      if (finish_word.isUrl) {
        finishRequest = await ctx.model.Law.FinalReport.create({
          url: finish_word.value
        }, {
          transaction
        })
      } else {
        finishRequest = await ctx.model.Law.FinalReport.create({
          content: finish_word.value
        }, {
          transaction
        })
      }

      // 插入归档请求表
      if (reling_request.isUrl) {
        resultRequestRes = await ctx.model.Law.ResultRequest.create({
          word_url: reling_request.value,
        }, {
          transaction
        })
      } else {
        resultRequestRes = await ctx.model.Law.ResultRequest.create({
          content: reling_request.value
        }, {
          transaction
        })
      }

      if (agency_word) {
        // 插入请求词表
        if (agency_word.isUrl) {
          agencyWordRes = await ctx.model.Law.AgencyWord.create({
            url: agency_word.value
          }, {
            transaction
          })
        } else {
          agencyWordRes = await ctx.model.Law.AgencyWord.create({
            content: agency_word.value
          }, {
            transaction
          })
        }
      } else {
        lawInfo = await ctx.model.Law.Law.findOne({
          where: {
            id: caseID
          }
        })
        if (lawInfo.agency_word_id === null) {
          throw new Error('案件没有代理词，请上传代理词后重新申请')
        }
      }

      await ctx.model.Law.Law.update({
        result_request_id: resultRequestRes.id,
        final_report_id: finishRequest.id,
        agency_word_id: agency_word === null ? lawInfo.agency_word_id : agencyWordRes.id
      }, {
        transaction,
        where: {
          id: caseID
        }
      })

      await transaction.commit();
      return ctx.retrunInfo(0, '', '申请成功');
    } catch (err) {
      await transaction.rollback();
      return ctx.retrunInfo(-1, '', err.message);
    }
  }

  /**
   * @description 下载指定url的word文档，并且将其插入到
   * @param {string} url
   * @param {string} filename
   * @return {string} 返回html文本
   * @memberof RemoveMessageService
   */
  async downLoadFile(url, filename) {
    return new Promise(resolve => {
      const pathName = path.join(__dirname, `../../public/word/${filename}`)
      http.get(url, (res) => {
        var data = "";
        res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
        res.on("data", function (chunk) {
          data += chunk;
        });
        res.on('end', () => {
          fs.writeFileSync(pathName, data, 'binary')
          mammoth.convertToHtml({ path: pathName })
            .then(function (result) {
              fs.unlinkSync(pathName) // 删除文件
              resolve(result.value) // 返回HTML格式的文本
            })
            .done();
        })
      })
    })
  }
}

module.exports = FinshLawService;
