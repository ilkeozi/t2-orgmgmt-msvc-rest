import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { OrganizationPostCodeProps } from "./interfaces/organizationPostCodeProps";

export class OrganizationPostCode extends ValueObject<OrganizationPostCodeProps> {
  public static minLength: number = 2;
  public static maxLength: number = 10000;

  get value (): string {
    return this.props.value;
  }

  private constructor (props: OrganizationPostCodeProps) {
    super(props);
  }

  public static create (props: OrganizationPostCodeProps): Result<OrganizationPostCode> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'OrganizationPostCode');

    if (nullGuardResult.isFailure) {
      return Result.fail<OrganizationPostCode>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<OrganizationPostCode>(minGuardResult.getErrorValue());
    }

    if (maxGuardResult.isFailure) {
      return Result.fail<OrganizationPostCode>(maxGuardResult.getErrorValue());
    }

    return Result.ok<OrganizationPostCode>(new OrganizationPostCode(props));
  }
}