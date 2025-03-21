/**
 * Abstract `Mapper` class used for transforming data between different representations.
 *
 * This class is used to convert data between:
 * - **DTO (Data Transfer Object) → Model**: When receiving data from an API or HTTP request and converting it to an internal entity.
 * - **Model → DTO**: When sending a response to a client with a specific structure.
 *
 * @template I Input type (e.g., DTO).
 * @template O Output type (e.g., Model or Entity).
 */
export abstract class Mapper<I, O> {
  /**
   * Abstract method that must be implemented by any class extending `Mapper`.
   * Converts an object of type `I` (input) to type `O` (output).
   *
   * @param param Input object to transform.
   * @returns Transformed object of type `O`.
   */
  abstract mapFrom(param: I): O;
}
