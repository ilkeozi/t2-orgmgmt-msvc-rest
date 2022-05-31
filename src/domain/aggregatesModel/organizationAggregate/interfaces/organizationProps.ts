import { OrganizationName } from "../organizationName";
import { OrganizationCity } from "../organizationCity";

// Organization Aggregate Root

export interface OrganizationProps {
    name: OrganizationName;
    city: OrganizationCity;
}
