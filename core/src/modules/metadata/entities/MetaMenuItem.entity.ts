import { Entity, Column, ManyToMany, Tree, TreeParent, TreeChildren } from 'typeorm';
import { AudibleEntity, EntityModule } from 'primebrick-sdk';
import { Role } from '../../auth/entities/Role.entity';

@EntityModule('core')
@Entity({ orderBy: { orderPriority: 'ASC' } })
@Tree('closure-table')
export class MetaMenuItem extends AudibleEntity {
    @Column({
        nullable: false,
    })
    labelKey: string;

    @Column({
        nullable: true,
    })
    icon: string;

    @Column({
        nullable: true,
    })
    color: string;

    @Column({
        nullable: true,
    })
    viewName: string;

    @Column()
    orderPriority: number;

    @TreeParent()
    parent: MetaMenuItem;

    @TreeChildren()
    children: MetaMenuItem[];

    @ManyToMany((type) => Role, (T) => T.menuItems)
    roles: Role[];
}
