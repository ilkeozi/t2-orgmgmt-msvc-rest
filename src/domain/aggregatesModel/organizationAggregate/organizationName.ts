import { ValueObject } from "../../../shared/domain/ValueObject";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";

interface OrganizationNameProps {
  value: string;
}

export class OrganizationName extends ValueObject<OrganizationNameProps> {
  public static minLength: number = 2;
  public static maxLength: number = 10000;

  get value (): string {
    return this.props.value;
  }

  private constructor (props: OrganizationNameProps) {
    super(props);
  }

  public static create (props: OrganizationNameProps): Result<OrganizationName> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'OrganizationName');

    if (nullGuardResult.isFailure) {
      return Result.fail<OrganizationName>(nullGuardResult.getErrorValue());
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (minGuardResult.isFailure) {
      return Result.fail<OrganizationName>(minGuardResult.getErrorValue());
    }

    if (maxGuardResult.isFailure) {
      return Result.fail<OrganizationName>(maxGuardResult.getErrorValue());
    }

    return Result.ok<OrganizationName>(new OrganizationName(props));
  }
}