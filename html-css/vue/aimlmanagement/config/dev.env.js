'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_URL: '"http://192.168.100.211:9080"', // 测试
  // BASE_URL: '"http://localhost:8080"',
})
