import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { OrganizationDescriptionProps } from "./interfaces/organizationDescriptionProps";

export class OrganizationDescription extends ValueObject<OrganizationDescriptionProps> {
  public static minLength: number = 2;
  public static maxLength: number = 10000;

  get value (): string {
    return this.props.value;
  }

  private constructor (props: OrganizationDescriptionProps) {
    super(props);
  }

  public static create (props: OrganizationDescriptionProps): Result<OrganizationDescription> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'OrganizationDescription');

    if (nullGuardResult.isFailure) {
      return Result.fail<OrganizationDescription>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<OrganizationDescription>(minGuardResult.getErrorValue());
    }

    if (maxGuardResult.isFailure) {
      return Result.fail<OrganizationDescription>(maxGuardResult.getErrorValue());
    }

    return Result.ok<OrganizationDescription>(new OrganizationDescription(props));
  }
}