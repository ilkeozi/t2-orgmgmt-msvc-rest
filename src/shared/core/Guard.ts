
/**
 * Guard response specifying validation result.
 */
export type GuardResponse = string;

import { Result } from "./Result";

/**
 * Interface defining a GuardArgument.
 */
export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

/**
 * Collection of guard arguments.
 */
export type GuardArgumentCollection = IGuardArgument[];


/**
 * Provides static methods for validation of values, arguments and collections.
 */
export class Guard {

  /**
   * Combines GuardResults and return a GuardResponse.
   * @param guardResults GuardResults to be combined.
   * @returns Ok or Fail GuardResponse result with a response message.
   */
  public static combine (guardResults: Result<any>[]): Result<GuardResponse> {
    for (let result of guardResults) {
      if (result.isFailure) return result;
    }

    return Result.ok<GuardResponse>();
  }

  /**
   * Checks if the value is greater then a minimum value.
   * @param minValue Minimum value to be checked against.
   * @param actualValue Value to be checked.
   * @returns Ok or Fail GuardResponse result with a response message.
   */
  public static greaterThan (minValue: number, actualValue: number): Result<GuardResponse> {
    return actualValue > minValue 
      ? Result.ok<GuardResponse>() 
      : Result.fail<GuardResponse>(`Number given {${actualValue}} is not greater than {${minValue}}`);
  }

  /**
   * Checks if the text parameter contains at least a specific amount of characters.
   * @param numChars Minimum number of characters to be checked.
   * @param text Text value to be checked.
   * @returns Ok or Fail GuardResponse result with a response message.
   */
  public static againstAtLeast (numChars: number, text: string): Result<GuardResponse> {
    return text.length >= numChars 
      ? Result.ok<GuardResponse>() 
      : Result.fail<GuardResponse>(`Text is not at least ${numChars} chars.`);
  }

  /**
   * Checks if the text parameter contains at most a specific amount of characters.
   * @param numChars Maximum number of characters to be checked.
   * @param text Text value to be checked.
   * @returns  Ok or Fail GuardResponse result with a response message.
   */
  public static againstAtMost (numChars: number, text: string): Result<GuardResponse> {
    return text.length <= numChars 
      ? Result.ok<GuardResponse>() 
      : Result.fail<GuardResponse>(`Text is greater than ${numChars} chars.`);
  }

  /**
   * Check if the argument with the provided argumentName is null or undefined.
   * @param argument Argument to be checked.
   * @param argumentName Name of the argument to be checked.
   * @returns Ok or Fail GuardResponse result with a response message.
   */
  public static againstNullOrUndefined (argument: any, argumentName: string): Result<GuardResponse> {
    if (argument === null || argument === undefined) {
      return Result.fail<GuardResponse>(`${argumentName} is null or undefined`)
    } else {
      return Result.ok<GuardResponse>();
    }
  }

  /**
   * Checks if the arguments in GuardArgumentCollection are null or undefined in bulk.
   * @param args Collection of Arguments in GuardArgumentCollection.
   * @returns Ok or Fail GuardResponse result with a response message.
   */
  public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): Result<GuardResponse> {
    for (let arg of args) {
      const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
      if (result.isFailure) return result;
    }

    return Result.ok<GuardResponse>();
  }

  /**
   * Checks if the value with the given argument name is one of the valid values.
   * @param value Value to be checked.
   * @param validValues Array of valid values accepted.
   * @param argumentName Name of the value argument.
   * @returns Ok or Fail GuardResponse result with a response message.
   */
  public static isOneOf (value: any, validValues: any[], argumentName: string) : Result<GuardResponse> {
    let isValid = false;
    for (let validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return Result.ok<GuardResponse>()
    } else {
      return Result.fail<GuardResponse>(`${argumentName} isn't oneOf the correct types in ${JSON.stringify(validValues)}. Got "${value}".`);
    }
  }

  /**
   * Checks if the number with the argumentName is within minimum and maximum ranges.
   * @param num Number to be checked.
   * @param min Minimum accepted value.
   * @param max Maximum accepted value.
   * @param argumentName Name of the num argument provided.
   * @returns Ok or Fail GuardResponse result with a response message.
   */
  public static inRange (num: number, min: number, max: number, argumentName: string) : Result<GuardResponse> {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return Result.fail<GuardResponse>(`${argumentName} is not within range ${min} to ${max}.`);
    } else {
      return Result.ok<GuardResponse>()
    }
  }

  /**
   * Checks if the numbers array with the argumentName is within minimum and maximum ranges.
   * @param numbers Array of Numbers to be checked.
   * @param min Minimum accepted value.
   * @param max Maximum accepted value.
   * @param argumentName Name of the num argument provided.
   * @returns Ok or Fail GuardResponse result with a response message.
   */
  public static allInRange (numbers: number[], min: number, max: number, argumentName: string) : Result<GuardResponse> {
    let failingResult: Result<GuardResponse> = null;

    for(let num of numbers) {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult.isFailure) failingResult = numIsInRangeResult;
    }

    if (failingResult) {
      return Result.fail<GuardResponse>(`${argumentName} is not within the range.`);
    } else {
      return Result.ok<GuardResponse>()
    }
  }
}