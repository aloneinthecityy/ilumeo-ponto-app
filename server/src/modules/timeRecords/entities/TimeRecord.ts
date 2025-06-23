export class TimeRecord {
  id!: string;
  userId!: string;
  timestamp!: Date;
  type!: 'IN' | 'OUT'; 

  constructor(props: Omit<TimeRecord, 'id'>, id?: string) {
    Object.assign(this, props);
    if (!id) {
      this.id = Math.random().toString(36).substring(7);
    }
  }
}
//essa 'entidade' define como os dados de um registro de ponto devem ser estruturados
