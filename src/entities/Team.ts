import { uuid } from 'uuidv4';

export class Team {
    public readonly id!: string;

    public leader!: string;
    public name!: string;

    constructor(props: Omit<Team, 'id'>, id?: string) {
        Object.assign(this, props);

        if (!id) {
            this.id = uuid();
        }
    }
}