import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import logger from '../logger';

interface AdoptionItem {
  id: string;
  petId: string;
  userId: string;
  date: string;
}

@Injectable()
export class AdoptionService {
  private items: AdoptionItem[] = [];

  findAll(): AdoptionItem[] {
    return this.items;
  }

  findOne(id: string): AdoptionItem | null {
    return this.items.find((i) => i.id === id) || null;
  }

  create(dto: { petId: string; userId: string; date?: string }): AdoptionItem {
    const item: AdoptionItem = {
      id: uuidv4(),
      petId: dto.petId,
      userId: dto.userId,
      date: dto.date || new Date().toISOString(),
    };
    this.items.push(item);
    logger.info(`Adoption created: ${item.id}`);
    return item;
  }

  update(id: string, dto: Partial<AdoptionItem>): AdoptionItem | null {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) return null;
    this.items[idx] = { ...this.items[idx], ...dto };
    logger.info(`Adoption updated: ${id}`);
    return this.items[idx];
  }

  remove(id: string): boolean {
    const idx = this.items.findIndex((i) => i.id === id);
    if (idx === -1) return false;
    this.items.splice(idx, 1);
    logger.info(`Adoption removed: ${id}`);
    return true;
  }
}
