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
    supplierCode: string; //TODO: in order to not be so strict, is not better to think about external code?

    @Column()
    description: string;

    @Column({
        nullable: false,
        enum: ProductType
    })
    productType: ProductType;

    @ManyToOne((type) => Partner)
    @JoinColumn()
    defaultSupplier: Partner //TODO: Should be better to make an many to many relationship between partner and product and in this entity add the "IsDefault" field

    @OneToMany((type) => WarehouseLine, (T) => T.product)
    productWarehouseLines: WarehouseLine[]; //TODO: WARNING, here we have the risk for circular dependency, if erp-stock import erp-base, is not ok to do the opposite
    //My suggestion is to remove this part of the relation, also because erp-base never will need to access "stock" module dataset, it must remain a responsability of the erp-stock

}



