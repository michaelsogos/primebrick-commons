import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';
import { Product } from './Product.entity';


enum PartnerType{
    Customer = 1,
    Supplier = 2
}

@RegisterEntity('erpbase')
@Entity()
export class Partner extends AudibleEntity {
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

    @Column({
        nullable: false,
        enum: PartnerType
    })
    partnerType: PartnerType;

    @OneToMany(type => Product, (T) => T.defaultSupplier)
    products: Product

}



