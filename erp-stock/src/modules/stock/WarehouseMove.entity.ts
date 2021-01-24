import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';
import { Company, BusinessUnit, Partner } from 'erp-base';
import { Warehouse } from './Warehouse.entity';
import { WarehouseMoveLine } from './WarehouseMoveLine.entity';

enum WarehouseMoveType {
    Incoming = 1,
    Outgoing = 2,
}

enum WarehouseMoveStatus {
    DRAFT = 1,
    CONFIRMED = 2,
    CLOSED = 3,
    CANCELLED = 4,
}

//TODO: Maybe i'm wrong but i don't see the need of moveline, i mean that warehouse movement desn't have master-slave strcture; my tips is to merge warehousemove with warehousemoveline
@RegisterEntity('erpstock')
@Entity()
export class WarehouseMove extends AudibleEntity {
    @Column({
        nullable: false,
        unique: true,
    })
    code: string;

    @Column({
        enum: WarehouseMoveType,
        nullable: false,
    })
    warehouseMoveType: WarehouseMoveType;

    @Column({
        enum: WarehouseMoveStatus,
        nullable: false,
    })
    status: WarehouseMoveStatus;

    @Column({
        nullable: false,
    })
    creationDate: Date; //TODO: Its name should be registeredOn

    @Column()
    confirmationDate: Date; //TODO: Its name should be confirmedOn

    @Column()
    closingDate: Date; //TODO: Its name should be closedOn; doesn't seems duplicated of confirmationDate ?

    @Column()
    cancellingDate: Date; //TODO: Its name should be canceledOn

    @ManyToOne((type) => Company)
    @JoinColumn()
    company: Company;

    @ManyToOne((type) => Partner)
    @JoinColumn()
    partner: Partner;

    @ManyToOne((type) => BusinessUnit)
    @JoinColumn()
    targetBusinessUnit: BusinessUnit;

     //TODO: A warehouse move should be linked to a warehouse line (so a specific move because specific product)
    //It's ok to have also a link to warehouse, but it is a plus
    @ManyToOne((type) => Warehouse)
    @JoinColumn()
    targetWarehouse: Warehouse;

    @ManyToOne((type) => BusinessUnit)
    @JoinColumn()
    sourceBusinessUnit: BusinessUnit;

    //TODO: A warehouse move should be linked to a warehouse line (so a specific move because specific product)
    //It's ok to have also a link to warehouse, but it is a plus
    @ManyToOne((type) => Warehouse)
    @JoinColumn()
    sourceWarehouse: Warehouse;

    @OneToMany((type) => WarehouseMoveLine, (T) => T.warehouseMove)
    warehouseMoveLines: WarehouseMoveLine[];
}
