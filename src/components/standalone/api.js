/**
 * @file standalone/api.js
 * @author maoquan(maoquan@htsc.com)
 */

import axios from 'axios';

export default {
  getList: axios.get('/api/test/users'),
};
