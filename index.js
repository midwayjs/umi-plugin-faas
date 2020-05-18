const { useExpressDevPack } = require('@midwayjs/faas-dev-pack');
const URL = require('url');

module.exports = (api) => {

  api.describe({
    key: 'faas',
    config:{
      sourceDir: "src/apis",
      // 忽略渲染函数
      ignoreWildcardFunctions: ["render"],
      // 忽略静态文件地址
      ignorePattern: (req) => {
        const { pathname } = URL.parse(req.url);
        return /\.(js|css|map|json|png|jpg|jpeg|gif|svg|eot|woff2|ttf)$/.test(
          pathname
        );
      },
    },
  });

  const opts = api.userConfig.faas || {};

  api.addBeforeMiddewares(
    useExpressDevPack(opts)
  );
};
