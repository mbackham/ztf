/**
 * 接口域名的管理
 */
let base = {    
    portSRC: 'http://domch.cn/app-api/',
    portSRCFile: 'http://domch.cn/file-api/'
  
}
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'testing') {
    base = {    
        portSRC: 'http://domch.cn/app-api/',
        portSRCFile: 'http://domch.cn/file-api/'
      
    }

  }else if(process.env.NODE_ENV==='production'){

    base = {   
        // portSRC: 'http://domch.cn/app-api/',
        // portSRCFile: 'http://domch.cn/file-api/' 
        //  portSRC: 'http://ccss.chinaccs.cn/app-api/',
        //  portSRCFile: 'http://ccss.chinaccs.cn/file-api/'
        portSRC: 'http://domch.cn/app-api/',
    portSRCFile: 'http://domch.cn/file-api/'
      
    }
  }else if(process.env.NODE_ENV==='preing'){
     base = {    
        portSRC: 'http://domch.cn/app-api/',
        portSRCFile: 'http://domch.cn/file-api/'
            // portSRC: 'http://ccss.chinaccs.cn/wx/Engineer/app-api/',
            // portSRCFile: 'http://ccss.chinaccs.cn/wx/Engineer/file-api/'
      
     }
  }

export default base;




/**
 * 接口域名的管理
 */
// 环境判断
// 本地开发时切换localhost，打包时切换production再打包
// const environment = 'production';

// // 接口
// let base;

// if (environment === 'localhost') {
//     // 本地环境
//     base = {
//         base: '/api',
//         vote: '/api'    
//     }
// } else if (environment === 'production') {
//     // 生产环境
//     base = {
//         base: 'http://ykmama.cn/index.php?',
//         vote: 'http://ykmama.cn/index.php?',  
//     }
// }

// export default base;
