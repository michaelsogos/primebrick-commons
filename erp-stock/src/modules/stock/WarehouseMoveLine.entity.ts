import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';
import { Warehouse } from './Warehouse.entity';
import { Product } from 'erp-base';

@RegisterEntity('erpstock')
@Entity()
export class WarehouseMoveLine extends AudibleEntity {

    @Column({nullable: false})
    qty: number;

    @Column({nullable: false})
    checkedQty: number;

    @Column({nullable: false})
    realQty: number;

    @ManyToOne((type) => Product)
    @JoinColumn()
    product: Product;
}
