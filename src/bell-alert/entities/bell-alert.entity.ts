import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class BellAlert {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    userId: number;

    @Column()
    jobTitleId: number;

    @Column()
    jobTitle: string;

    @Column()
    originLink:string

    @Column()
    companyName:string

    @Column({nullable:true})
    detail:string

    @Column()
    email: string;

    @Column('boolean', { default: true })
    bellCheck: boolean;

    @Column('boolean', { default: false })
    isDeleted: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
