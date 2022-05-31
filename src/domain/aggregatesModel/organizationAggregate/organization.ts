import { OrganizationId } from "./organizationId";
import { Guard } from "../../../shared/core/Guard";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Result } from "../../../shared/core/Result";
import { OrganizationCity } from "./organizationCity";
import { OrganizationProps } from "./interfaces/organizationProps";
import { OrganizationName } from "./organizationName";

export class Organization extends Entity<OrganizationProps> {

  /**
   * Gets Id of the Organization.
   */
  get organizationId(): OrganizationId {
    return OrganizationId.create(this._id).getValue();
  }

  /**
   * Gets Name of the Organization.
   */
   get name(): OrganizationName {
    return this.props.name;
  }

  /**
   * Gets City of the Organization.
   */
  get city(): OrganizationCity {
    return this.props.city;
  }

  /**
   * Creates an organization with given properties and id.
   * @param props Properties of the organization to be created.
   * @param id Id of the organization to be created.
   * @returns Ok or fail result with response message.
   */
  public static create(
    props: OrganizationProps,
    id?: UniqueEntityID
  ): Result<Organization> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: "name" },
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Organization>(nullGuard.getErrorValue());
    } else {
      const isNewOrganization = !!id === false;

      const defaultOrganizationProps: OrganizationProps = {
        ...props, // Add any default props wanted to be initialized here.
      };

      const organization = new Organization(defaultOrganizationProps, id);

      return Result.ok<Organization>(organization);
    }
  }
}
