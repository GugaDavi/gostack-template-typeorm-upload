import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

const tpmDir = resolve(__dirname, '..', '..', 'tmp');

export default {
  diretory: tpmDir,
  storage: multer.diskStorage({
    destination: tpmDir,
    filename(req, file, cb) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return cb(null, fileName);
    },
  }),
};
