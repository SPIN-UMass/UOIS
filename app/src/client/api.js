import { CommonAPI } from '~/api/common'
import { PermissionDeniedError, InvalidInvitationCodeError } from '~/utils/errors'
import config from '~/utils/config'

const SESSION_URL = '/sessions'
const CLIENT_URL = '/client'


class ClientAPI extends CommonAPI {
  registerClient (invitationCode) {
    return this.transport.post(
      '/clients', 
      {
        ip:undefined,
        'invitation_code':invitationCode
      }
    )
    .then(r => r.data)
    .catch(PermissionDeniedError, err => {
      throw new InvalidInvitationCodeError('Invalid Invitation Code')
    })
  }

  clientUp () {
    return this.transport.post(
      CLIENT_URL + '/' + this.userID, 
      {
        'categoie': 'TBD'
      }
    ).then(r => r.data)
  }

  requestSession () {
    return this.transport.post(
      CLIENT_URL + '/' + this.userID + SESSION_URL,{
        'cdn_session': false
      }
    )
    .then(r => {
      if (r.status == 201) {
        return r.data
      }

      // Sesion not found
      return null
    })
  }
}

const API = new ClientAPI()
export default API