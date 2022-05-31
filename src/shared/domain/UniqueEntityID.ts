const { v4: uuid4 } = require('uuid')
import { Identifier } from './Identifier'

export class UniqueEntityID extends Identifier<string | number>{
  constructor (id?: string | number) {
    super(id ? id : uuid4())
  }
}