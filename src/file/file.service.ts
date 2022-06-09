import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { Express } from 'express';
import { File } from '../entities/file.entity';
import { FileRepository } from '../config/repositories/file.repository';
import { UserRepository } from '../config/repositories/user.repository';


@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository, private readonly userRepository: UserRepository) { }
  upload(file: Express.Multer.File, body: Record<string, string>): string {
    let fileName = `${Date.now()}-${file.originalname}`
    var writeStream = createWriteStream(join(__dirname, '../../static/upload', fileName));
    writeStream.write(file.buffer, async (err) => {
      if (err) return
      const user = await this.userRepository.findOne(1);
      let fileEntity = new File();
      fileEntity.name = body.name;
      fileEntity.desc = body.desc;
      fileEntity.size = file.size;
      fileEntity.addr = fileName;
      fileEntity.originalname = file.originalname;
      fileEntity.type = file.originalname.match(/\.*\.(\w+)$/)[1];
      fileEntity.createTime = Date.now();
      fileEntity.user = user;
      this.fileRepository.save(fileEntity)

    });
    return 'success';
  }
  async download(id: number, res) {
    let findItem = await this.fileRepository.findOne({ id });
    let path = join(__dirname, '../../static/upload', findItem.addr)
    // let readStream = createReadStream(path)
    // res.setHeader(
    //   'content-Disposition', `attachment; filename="${findItem.name}.${findItem.type}"`,
    // )
    // return new StreamableFile(readStream)
    res.download(path, `${findItem.name}.${findItem.type}`, err => {
      if (!err) return
      console.log('下载成功')
    })
  }
}
