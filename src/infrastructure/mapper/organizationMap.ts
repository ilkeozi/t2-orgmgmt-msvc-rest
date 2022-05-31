
import { Organization } from "../../domain/aggregatesModel/organizationAggregate/organization"
import { OrganizationCity } from "../../domain/aggregatesModel/organizationAggregate/organizationCity"
import { OrganizationName } from "../../domain/aggregatesModel/organizationAggregate/organizationName"
import { UniqueEntityID } from "../../shared/domain/UniqueEntityID"
import { Mapper } from "../../shared/infrastructure/mapper"

/**
 * Maps Organization Persistance and Domain Objects.
 */
export class OrganizationMap implements Mapper<Organization> {

    /**
     * Maps Organization domain object to persistance object.
     * @param organization Organization domain object.
     * @returns Raw Organization object.
     */
    public static toPersistance(organization: Organization): any {
        return {
            id: organization.organizationId.id.toString(),
            name: organization.name.value,
            city: organization.city.value,
        }
    }

    /**
     * Maps Organization raw persistance object to domain object. 
     * @param raw Raw Organization persistance object.
     * @returns Organization domain object.
     */
    public static toDomain(raw: any): Organization {
        const organizationOrError = Organization.create({
            name: OrganizationName.create({value: raw.name }).getValue(),
            city: OrganizationCity.create({value: raw.city }).getValue(),

        }, new UniqueEntityID(raw.id))

        organizationOrError.isFailure ? console.log(organizationOrError.getErrorValue()) : '';

        return organizationOrError.isSuccess ? organizationOrError.getValue() : null;
    }
}