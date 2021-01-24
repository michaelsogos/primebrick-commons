import { Entity, Column, OneToMany } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';
import { BusinessUnit } from './BusinessUnit.entity';
import { Warehouse } from 'erp-stock';


@RegisterEntity('erpbase')
@Entity()
export class Company extends AudibleEntity {
    @Column({
        nullable: false,
        unique: true,
    })
    code: string;

    @Column({
        nullable: false,
    })
    name: string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @OneToMany((type) => BusinessUnit, (T) => T.company)
    businessUnits: BusinessUnit[];

    @OneToMany((type) => Warehouse, (T) => T.company)
    warehouses: Warehouse[];//TODO: WARNING, here we have the risk for circular dependency, if erp-stock import erp-base, is not ok to do the opposite
}
