/**
 * Extracts the parameter names declared in a route path template.
 */
type ParseRouteParams<TPath> = TPath extends `${string}/:${infer TParam}/${infer TRest}`
    ? TParam | ParseRouteParams<`/${TRest}`>
    : TPath extends `${string}/:${infer TParam}`
      ? TParam
      : never;

/**
 * An immutable, root-relative route path template. The literal path type is carried through every
 * fluent call, so {@link RoutePath.format} only accepts parameter names the template actually
 * declares. Deliberately free of any Angular import: unauthenticated route files can build their
 * paths without pulling in the router.
 *
 * @typeParam TPath The literal path template.
 * @public
 *
 * @example
 * ```typescript
 * const userPath = RoutePath.create('users').withParam(':userId');
 *
 * userPath.toRoute(); // '/users/:userId'
 * userPath.format('userId', '4711'); // 'users/4711'
 * ```
 */
export class RoutePath<TPath extends string = string> {
    // #region Fields

    private readonly _path: TPath;

    // #endregion

    // #region Ctor

    /**
     * Constructs a new instance of the `RoutePath` class.
     *
     * @param path The root-relative path template.
     * @throws Error when the path carries a query or fragment part, or is not root-relative.
     */
    private constructor(path: TPath) {
        if (path.includes('?') || path.includes('#')) {
            throw new Error(`The route path "${path}" must not contain a query or fragment part.`);
        }

        if (path.startsWith('/') || path.startsWith('.')) {
            throw new Error(`The route path "${path}" must be root-relative and must not start with "/" or ".".`);
        }

        this._path = path;
    }

    // #endregion

    // #region Properties

    /**
     * The root-relative path template without a leading slash.
     *
     * @public
     * @readonly
     */
    public get path(): TPath {
        return this._path;
    }

    // #endregion

    // #region Methods

    /**
     * Creates a route path from a template.
     *
     * @public
     * @typeParam TPath The literal path template.
     * @param path The root-relative path template.
     * @returns The created route path.
     * @throws Error when the path carries a query or fragment part, or is not root-relative.
     */
    public static create<TPath extends string = string>(path: TPath): RoutePath<TPath> {
        return new RoutePath(path);
    }

    /**
     * Compares a URL path with this template. A leading slash as well as query and fragment parts
     * of the argument are ignored, so a value taken straight from `Router.url` can be compared.
     *
     * @public
     * @param path The path to compare.
     * @returns `true` when both denote the same path.
     */
    public equals(path: string): boolean {
        const rootRelative = path.startsWith('/') ? path.slice(1) : path;

        return rootRelative.replace(/[?#].*$/u, '') === this._path;
    }

    /**
     * Returns the root-relative path template.
     *
     * @public
     * @returns The path without a leading slash.
     */
    public toString(): TPath {
        return this._path;
    }

    /**
     * Returns the absolute path template.
     *
     * @public
     * @returns The path with a leading slash.
     */
    public toRoute(): `/${TPath}` {
        return `/${this._path}`;
    }

    /**
     * Replaces one declared parameter placeholder with a URL-encoded value.
     *
     * @public
     * @param parameter The parameter name declared by the template.
     * @param value The raw value; it is URL-encoded.
     * @returns The path with the placeholder replaced.
     */
    public format(parameter: ParseRouteParams<TPath>, value: string): string {
        return this._path.replace(`:${String(parameter)}`, encodeURIComponent(value));
    }

    /**
     * Appends a parameter placeholder to the template. Appending a placeholder the template
     * already declares returns the same path.
     *
     * @public
     * @typeParam TParam The parameter name.
     * @param parameter The placeholder including its leading colon, for example `':userId'`.
     * @returns The extended route path.
     */
    public withParam<TParam extends string>(parameter: `:${TParam}`): RoutePath<`${TPath}/:${TParam}`> {
        if (this._path.includes(parameter)) {
            return this as unknown as RoutePath<`${TPath}/:${TParam}`>;
        }

        return RoutePath.create<`${TPath}/:${TParam}`>(`${this._path}/${parameter}` as `${TPath}/:${TParam}`);
    }

    /**
     * Appends a child segment to the template.
     *
     * @public
     * @typeParam TChild The child segment.
     * @param childPath The child segment without a leading slash.
     * @returns The extended route path.
     */
    public withChild<TChild extends string>(childPath: TChild): RoutePath<`${TPath}/${TChild}`> {
        return RoutePath.create<`${TPath}/${TChild}`>(`${this._path}/${childPath}`);
    }

    // #endregion
}
