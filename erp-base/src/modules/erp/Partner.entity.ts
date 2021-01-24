import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AudibleEntity, RegisterEntity } from 'primebrick-sdk';
import { Product } from './Product.entity';


enum PartnerType{
    Customer = 1,
    Supplier = 2
}

//TODO: Usually in an ERP SYSTEM the entity CUSTOMER CONTACT contains many fields right for "customer", while SUPPLIER CONTACT other many fields right for "Supplier"
//So we can:
//1. Have two different entities
//2. Have one generic entity and two extended table for customer and for supplier
//3. Have one single entity like here
//Analyze the possibilitiess and share it with someone else in order to confirm 
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
    name: string; //TODO: Both customer and supplier should not have a NAME but at least: COMPANY NAME, FIRST NAME, LAST NAME -> optionally a FULL NAME but it should comes from calculated virtual field
    //We should check postgres capability for "VIRTUAL FIELD" and check if fit in somehow our needs

    @Column()
    supplierCode: string;//TODO: The field CODE already exists, why we need this one?

    @Column({
        nullable: false,
        enum: PartnerType
    })
    partnerType: PartnerType;

    @OneToMany(type => Product, (T) => T.defaultSupplier)
    products: Product //TODO: A supplier has many product, not just one, should not it be a List?

}



