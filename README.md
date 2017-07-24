该项目react-dianpingApp 仿照了大众点评app做出的一款简易型webapp。
项目启动步骤：
1. git clone 仓库地址
2. npm install 安装依赖
3. npm run mock 模拟后端数据
4. npm start 启动该项目，浏览器会自动打开一个网页http://localhost:8080，即可看到项目。

项目目录结构：
 1. /node_modules/   # 第三方类库和工具
 2. /build/          #构建打包输出的文件
 3. /mock/           #模拟后端数据
 4. /app/
	 	/actions/     #react actions

	 	/components/  #页面组件(木偶组件)

	 	/config/	  #配置

	 	/constants/	  #常量信息

	 	/containers/  #布局信息(智能组件)

	 	/fetch/		  #请求接口

	 	/reducers/	  #react reducer

	 	/router/	  #路由信息

	 	/static/	  #css等静态文件

	 	/store/		  #createStore文件
	 	
	 	/util/		  #localStorage 公用方法
 5. webpack.config.js    # 扩展 webpack 配置
 6. package.json         # 配置入口文件、依赖和 scripts