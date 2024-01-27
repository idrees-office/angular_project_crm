export class Mailbox {
  constructor(
    public MailId: string,
    public fromId: string,
    public Subject: string,
    public Message: string,
    public date: Date,
    public readStatus: boolean,
    public seen: boolean,
    public mailbox: string,
    public filter: string[],
    public label: string[]
  ) {}
}



export class Leadbox {
  constructor(
    public lead_id : any,
    public lead_title : any,
    public customer_name: any,
    public customer_phone: any,
    public customer_phone2: any,
    public customer_email: any,
    public customer_position: any,
    public lead_status: any,
    public assigned_at: Date,
    public created_at: Date,
    public updated_at: Date,
    public filter: string[],
    public label: string[],
    public seen: boolean,
  ) {}
}
