import { Organization } from "../organization";
import { OrganizationId } from "../organizationId";

export interface IOrganizationRepo {
    exists (organizationId: string): Promise<boolean>
    getOrganizationById (organizationId: string): Promise<Organization>
    save (organization: Organization): Promise<void>
    saveBulk (organizations: Organization[]): Promise<void>
    deleteOrganization (organizationId: OrganizationId): Promise<void>
  }