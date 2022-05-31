import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { OrganizationCityProps } from "./interfaces/organizationCityProps";

export class OrganizationCity extends ValueObject<OrganizationCityProps> {
  public static minLength: number = 2;
  public static maxLength: number = 10000;

  get value (): string {
    return this.props.value;
  }

  private constructor (props: OrganizationCityProps) {
    super(props);
  }

  public static create (props: OrganizationCityProps): Result<OrganizationCity> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'OrganizationCity');

    if (nullGuardResult.isFailure) {
      return Result.fail<OrganizationCity>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<OrganizationCity>(minGuardResult.getErrorValue());
    }

    if (maxGuardResult.isFailure) {
      return Result.fail<OrganizationCity>(maxGuardResult.getErrorValue());
    }

    return Result.ok<OrganizationCity>(new OrganizationCity(props));
  }
}