import API from '@/services/API'

export default {
  login () {
    return API().get('login')
  }
}