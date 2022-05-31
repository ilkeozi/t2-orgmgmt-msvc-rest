import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { OrganizationAddressProps } from "./interfaces/organizationAddressProps";

export class OrganizationAddress extends ValueObject<OrganizationAddressProps> {
  public static minLength: number = 2;
  public static maxLength: number = 10000;

  get value (): string {
    return this.props.value;
  }

  private constructor (props: OrganizationAddressProps) {
    super(props);
  }

  public static create (props: OrganizationAddressProps): Result<OrganizationAddress> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'OrganizationAddress');

    if (nullGuardResult.isFailure) {
      return Result.fail<OrganizationAddress>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<OrganizationAddress>(minGuardResult.getErrorValue());
    }

    if (maxGuardResult.isFailure) {
      return Result.fail<OrganizationAddress>(maxGuardResult.getErrorValue());
    }

    return Result.ok<OrganizationAddress>(new OrganizationAddress(props));
  }
}