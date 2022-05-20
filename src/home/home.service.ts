import { Injectable } from '@nestjs/common';
import { UserRepository } from '../config/repositories/user.repository';
import { FileRepository } from '../config/repositories/file.repository';
import { File } from '../entities/file.entity';
import { Like } from "typeorm";

interface fileType {
  type: string
}
interface QueryWhere {
  type?: string;
  name?: unknown
}
@Injectable()
export class HomeService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly fileRepository: FileRepository
  ) { }
  async getFileList(body): Promise<File[]> {
    let where: QueryWhere = {};
    body.type && (where.type = body.type)
    body.name && (where.name = Like(`%${body.name}%`))
    return this.fileRepository.find({
      where
    });
  }
  async getFileTypeList() {
    return this.fileRepository.query('select distinct type from file;')
  }
  async update(body): Promise<File> {
    const user = await this.userRepository.findOne(1);
    const file = new File();
    file.size = 200;
    file.name = 'test';
    file.type = 'custom';
    file.user = user
    return this.fileRepository.save(file);
  }
  async deleteFile(id: number) {
    return this.fileRepository.delete({ id });
  }
}
