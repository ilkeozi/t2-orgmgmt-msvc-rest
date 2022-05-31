import { Organization } from "../../../../src/domain/aggregatesModel/organizationAggregate/organization";
import { OrganizationCity } from "../../../../src/domain/aggregatesModel/organizationAggregate/organizationCity";
import { OrganizationName } from "../../../../src/domain/aggregatesModel/organizationAggregate/organizationName";
import { OrganizationProps } from "../../../../src/domain/aggregatesModel/organizationAggregate/interfaces/organizationProps";
import { OrganizationMap } from "../../../../src/infrastructure/mapper/organizationMap";
import { UniqueEntityID } from "../../../../src/shared/domain/UniqueEntityID";

describe("organizationMap", () => {
  describe("toPersistance", () => {
    it("Should map an Organization domain object to persistance object.", async () => {
      const expectedOrganizationProps: OrganizationProps = {
        name: OrganizationName.create({ value: "testName" }).getValue(),
        city: OrganizationCity.create({ value: "testCity" }).getValue(),
      };
      const expectedOrganization = Organization.create(
        expectedOrganizationProps
      ).getValue();
      const actualRawOrganization =
        OrganizationMap.toPersistance(expectedOrganization);

      expect(actualRawOrganization.name).toBe(expectedOrganization.name.value);
      expect(actualRawOrganization.city).toBe(expectedOrganization.city.value);
      expect(actualRawOrganization.id).toBe(
        expectedOrganization.organizationId.id.toValue()
      );
    });
  });
  describe("toDomain", () => {
    it("Should map organization raw persistance object to a organization domain object.", async () => {
      const expectedRawOrganization = {
        name: "testName",
        city: "testCity",
        id: new UniqueEntityID(),
      };
      const actualOrganization = OrganizationMap.toDomain(
        expectedRawOrganization
      );
      expect(actualOrganization.city.value).toBe(expectedRawOrganization.city);
      expect(actualOrganization.name.value).toBe(expectedRawOrganization.name);
      expect(actualOrganization.organizationId.id.toValue()).toBe(
        expectedRawOrganization.id
      );
    });
  });
});
