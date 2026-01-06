import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import logger from '../logger';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string | null;
  documents: Array<{ name: string; reference: string }>;
  last_connection: string | null;
}

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(dto: Partial<User>): User {
    const user: User = {
      id: uuidv4(),
      first_name: dto.first_name as string,
      last_name: dto.last_name as string,
      email: dto.email as string,
      password: dto.password || null,
      documents: [],
      last_connection: null,
    };
    this.users.push(user);
    logger.info(`User created: ${user.id}`);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  findByEmail(email: string) {
    return this.users.find((u) => u.email === email) || null;
  }

  addDocuments(id: string, files: Express.Multer.File[]) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    const added = [] as any[];
    for (const f of files || []) {
      const doc = { name: f.originalname, reference: f.path || (f.destination ? `${f.destination}/${f.filename}` : f.filename) };
      user.documents.push(doc);
      added.push(doc);
    }
    logger.info(`Added ${added.length} documents for user ${id}`);
    return added;
  }

  updateLastConnection(id: string, when?: string) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    user.last_connection = when || new Date().toISOString();
    logger.info(`Updated last_connection for user ${id}`);
    return user.last_connection;
  }
}
