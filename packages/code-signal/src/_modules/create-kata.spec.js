import { KATA_DIR } from '../constants'
import { createKata } from './create-kata'
import {data} from './parsed-test-data.json'

test('happy', async () => {
  await createKata(KATA_DIR, data)
})