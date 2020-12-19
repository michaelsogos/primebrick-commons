import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';
import { BusinessUnitType } from './BusinessUnitType.entity';
import { Company } from './Company.entity';
import { Warehouse } from 'erp-stock';

@RegisterEntity('erpbase')
@Entity()
export class BusinessUnit extends AudibleEntity {
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
    @ManyToOne((type) => BusinessUnitType, (T) => T.businessUnits)
    @JoinColumn({ name: 'business_unit_type_id' })
    businessUnitType: BusinessUnitType;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @ManyToOne((type) => Company, (T) => T.businessUnits)
    @JoinColumn()
    company: Company;

    @OneToMany((type) => Warehouse, (T) => T.businessUnit)
    warehouses: Warehouse[];
}
