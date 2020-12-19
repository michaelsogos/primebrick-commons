import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';
import { Partner } from './Partner.entity';
import { WarehouseLine} from 'erp-stock';


enum ProductType{
    Product = 1,
    Service = 2
}

@RegisterEntity('erpbase')
@Entity()
export class Product extends AudibleEntity {
    @Column({
        nullable: false,
        unique: true,
    })
    code: string;

    @Column({
        nullable: false,
    })
    name: string;

    @Column()
    supplierCode: string;

    @Column()
    description: string;

    @Column({
        nullable: false,
        enum: ProductType
    })
    productType: ProductType;

    @ManyToOne((type) => Partner)
    @JoinColumn()
    defaultSupplier: Partner

    @OneToMany((type) => WarehouseLine, (T) => T.product)
    productWarehouseLines: WarehouseLine[];

}



