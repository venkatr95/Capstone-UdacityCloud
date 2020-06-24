import * as uuid from 'uuid'

export default class UidHelper{
    getId(){
        const urlId = uuid.v4()
        return urlId
    }
}