var hasOwn = Object.prototype.hasOwnProperty;
function isPrologueDirective(node) {
    return node.type === 'ExpressionStatement' &&
        node.expression.type === 'Literal';
}
function hasMask(mask, flags) {
    return (mask & flags) === flags;
}
function tryCreate(pattern, flags) {
    try {
        return new RegExp(pattern, flags);
    }
    catch (e) {
        return null;
    }
}
function fromCodePoint(codePoint) {
    if (codePoint <= 0xFFFF)
        { return String.fromCharCode(codePoint); }
    return String.fromCharCode(((codePoint - 0x10000) >> 10) + 0x0D800, ((codePoint - 0x10000) & (1024 - 1)) + 0x0DC00);
}
function toHex(code) {
    if (code < 48 /* Zero */)
        { return -1; }
    if (code <= 57 /* Nine */)
        { return code - 48 /* Zero */; }
    if (code < 65 /* UpperA */)
        { return -1; }
    if (code <= 70 /* UpperF */)
        { return code - 65 /* UpperA */ + 10; }
    if (code < 97 /* LowerA */)
        { return -1; }
    if (code <= 102 /* LowerF */)
        { return code - 97 /* LowerA */ + 10; }
    return -1;
}

// Fully qualified element name, e.g. <svg:path> returns "svg:path"
function isQualifiedJSXName(elementName) {
    switch (elementName.type) {
        case 'JSXIdentifier':
            return elementName.name;
        case 'JSXNamespacedName':
            return elementName.namespace + ':' + elementName.name;
        case 'JSXMemberExpression':
            return (isQualifiedJSXName(elementName.object) + '.' +
                isQualifiedJSXName(elementName.property));
        /* istanbul ignore next */
        default:
    }
}
function isValidDestructuringAssignmentTarget(expr) {
    switch (expr.type) {
        case 'Identifier':
        case 'ArrayExpression':
        case 'ArrayPattern':
        case 'ObjectExpression':
        case 'ObjectPattern':
        case 'MemberExpression':
        case 'ClassExpression':
        case 'CallExpression':
        case 'TemplateLiteral':
        case 'AssignmentExpression':
        case 'NewExpression':
            return true;
        default:
            return false;
    }
}
function isValidSimpleAssignmentTarget(expr) {
    switch (expr.type) {
        case 'Identifier':
        case 'MemberExpression':
            return true;
        default:
            return false;
    }
}

var KeywordDescTable = [
    'end of source',
    /* Constants/Bindings */
    'identifier', 'number', 'string', 'regular expression',
    'false', 'true', 'null',
    /* Template nodes */
    'template continuation', 'template end',
    /* Punctuators */
    '=>', '(', '{', '.', '...', '}', ')', ';', ',', '[', ']', ':', '?', '\'', '"', '</', '/>',
    /* Update operators */
    '++', '--',
    /* Assign operators */
    '=', '<<=', '>>=', '>>>=', '**=', '+=', '-=', '*=', '/=', '%=', '^=', '|=',
    '&=',
    /* Unary/binary operators */
    'typeof', 'delete', 'void', '!', '~', '+', '-', 'in', 'instanceof', '*', '%', '/', '**', '&&',
    '||', '===', '!==', '==', '!=', '<=', '>=', '<', '>', '<<', '>>', '>>>', '&', '|', '^',
    /* Variable declaration kinds */
    'var', 'let', 'const',
    /* Other reserved words */
    'break', 'case', 'catch', 'class', 'continue', 'debugger', 'default', 'do', 'else', 'export',
    'extends', 'finally', 'for', 'function', 'if', 'import', 'new', 'return', 'super', 'switch',
    'this', 'throw', 'try', 'while', 'with',
    /* Strict mode reserved words */
    'implements', 'interface', 'package', 'private', 'protected', 'public', 'static', 'yield',
    /* Contextual keywords */
    'as', 'async', 'await', 'constructor', 'get', 'set', 'from', 'of',
    'enum',
    /* JSX */
    'JSXText'
];
/**
 * The conversion function between token and its string description/representation.
 */
function tokenDesc(token) {
    return KeywordDescTable[token & 255 /* Type */];
}
// Used `Object.create(null)` to avoid potential `Object.prototype`
// interference.
var DescKeywordTable = Object.create(null, {
    as: { value: 69739 /* AsKeyword */ },
    async: { value: 69740 /* AsyncKeyword */ },
    await: { value: 331885 /* AwaitKeyword */ },
    break: { value: 12362 /* BreakKeyword */ },
    case: { value: 12363 /* CaseKeyword */ },
    catch: { value: 12364 /* CatchKeyword */ },
    class: { value: 274509 /* ClassKeyword */ },
    const: { value: 8663113 /* ConstKeyword */ },
    constructor: { value: 69742 /* ConstructorKeyword */ },
    continue: { value: 12366 /* ContinueKeyword */ },
    debugger: { value: 12367 /* DebuggerKeyword */ },
    default: { value: 12368 /* DefaultKeyword */ },
    delete: { value: 4468779 /* DeleteKeyword */ },
    do: { value: 12369 /* DoKeyword */ },
    enum: { value: 12403 /* EnumKeyword */ },
    else: { value: 12370 /* ElseKeyword */ },
    export: { value: 12371 /* ExportKeyword */ },
    extends: { value: 12372 /* ExtendsKeyword */ },
    false: { value: 274437 /* FalseKeyword */ },
    finally: { value: 12373 /* FinallyKeyword */ },
    for: { value: 12374 /* ForKeyword */ },
    from: { value: 69745 /* FromKeyword */ },
    function: { value: 274519 /* FunctionKeyword */ },
    get: { value: 69743 /* GetKeyword */ },
    if: { value: 12376 /* IfKeyword */ },
    implements: { value: 20579 /* ImplementsKeyword */ },
    import: { value: 274521 /* ImportKeyword */ },
    in: { value: 2111281 /* InKeyword */ },
    instanceof: { value: 2111282 /* InstanceofKeyword */ },
    interface: { value: 20580 /* InterfaceKeyword */ },
    let: { value: 8671304 /* LetKeyword */ },
    new: { value: 274522 /* NewKeyword */ },
    null: { value: 274439 /* NullKeyword */ },
    of: { value: 69746 /* OfKeyword */ },
    package: { value: 20581 /* PackageKeyword */ },
    private: { value: 20582 /* PrivateKeyword */ },
    protected: { value: 20583 /* ProtectedKeyword */ },
    public: { value: 20584 /* PublicKeyword */ },
    return: { value: 12379 /* ReturnKeyword */ },
    set: { value: 69744 /* SetKeyword */ },
    static: { value: 20585 /* StaticKeyword */ },
    super: { value: 274524 /* SuperKeyword */ },
    switch: { value: 274525 /* SwitchKeyword */ },
    this: { value: 274526 /* ThisKeyword */ },
    throw: { value: 12383 /* ThrowKeyword */ },
    true: { value: 274438 /* TrueKeyword */ },
    try: { value: 12384 /* TryKeyword */ },
    typeof: { value: 4468778 /* TypeofKeyword */ },
    var: { value: 8663111 /* VarKeyword */ },
    void: { value: 4468780 /* VoidKeyword */ },
    while: { value: 12385 /* WhileKeyword */ },
    with: { value: 12386 /* WithKeyword */ },
    yield: { value: 282730 /* YieldKeyword */ },
});
function descKeyword(value) {
    return (DescKeywordTable[value] | 0);
}

var ErrorMessages = {};
ErrorMessages[0 /* Unexpected */] = 'Unexpected token';
ErrorMessages[1 /* UnexpectedToken */] = 'Unexpected token \'%0\'';
ErrorMessages[2 /* UnterminatedComment */] = 'Unterminated comment';
ErrorMessages[3 /* UnterminatedString */] = 'Unterminated string literal';
ErrorMessages[4 /* UnterminatedRegExp */] = 'Unterminated regular expression literal';
ErrorMessages[5 /* UnicodeOutOfRange */] = 'Unicode escape code point out of range';
ErrorMessages[6 /* InvalidUnicodeEscapeSequence */] = 'Invalid Unicode escape sequence';
ErrorMessages[7 /* StrictOctalEscape */] = 'Octal escapes are not allowed in strict mode';
ErrorMessages[8 /* InvalidEightAndNine */] = 'Escapes \\8 or \\9 are not syntactically valid escapes';
ErrorMessages[9 /* StrictOctalLiteral */] = 'Octal literals are not allowed in strict mode';
ErrorMessages[10 /* MissingShebangExclamation */] = 'Missing exclamation in shebang';
ErrorMessages[11 /* DuplicateRegExpFlag */] = 'Duplicate flags supplied to RegExp constructor %0';
ErrorMessages[12 /* UnexpectedTokenRegExp */] = 'Unexpected regular expression';
ErrorMessages[13 /* UnexpectedTokenRegExpFlag */] = 'Unexpected regular expression flag';
ErrorMessages[14 /* BadImportCallArity */] = 'Dynamic import must have one specifier as an argument';
ErrorMessages[15 /* StrictFunction */] = 'In strict mode code, functions can only be declared at top level or inside a block';
ErrorMessages[16 /* BadContinue */] = 'Continue must be inside loop or switch statement';
ErrorMessages[17 /* IllegalBreak */] = 'Unlabeled break must be inside loop or switch';
ErrorMessages[19 /* IllegalReturn */] = 'Illegal return statement';
ErrorMessages[18 /* MultipleDefaultsInSwitch */] = 'More than one default clause in switch statement';
ErrorMessages[20 /* NoCatchOrFinally */] = 'Missing catch or finally after try';
ErrorMessages[21 /* LineBreakAfterThrow */] = 'No line break is allowed between \'throw\' and its expression';
ErrorMessages[22 /* StrictModeWith */] = 'Strict mode code may not include a with statement';
ErrorMessages[23 /* BadGetterArity */] = 'Getter must not have any formal parameters';
ErrorMessages[24 /* BadSetterArity */] = 'Setter must have exactly one formal parameter';
ErrorMessages[25 /* BadSetterRestParameter */] = 'Setter function argument must not be a rest parameter';
ErrorMessages[26 /* IllegalUseStrict */] = 'Illegal \'use strict\' directive in function with non-simple parameter list';
ErrorMessages[27 /* ParameterAfterRestParameter */] = 'Rest parameter must be last formal parameter';
ErrorMessages[28 /* StrictFunctionName */] = 'Function name may not be eval or arguments in strict mode code';
ErrorMessages[29 /* UnexpectedNewTarget */] = 'new.target only allowed within functions';
ErrorMessages[30 /* MetaNotInFunctionBody */] = 'new.target only allowed within functions';
ErrorMessages[31 /* DeclarationMissingInitializer */] = 'Missing = in %0 declaration';
ErrorMessages[33 /* InvalidLHSInForLoop */] = 'Invalid left-hand side in for-loop';
ErrorMessages[32 /* InvalidVarInitForOf */] = 'Invalid variable declaration in for-of statement';
ErrorMessages[34 /* InvalidLHSInForIn */] = 'Invalid left-hand side in for-in';
ErrorMessages[35 /* StrictLHSAssignment */] = 'Eval or arguments can\'t be assigned to in strict mode code';
ErrorMessages[36 /* InvalidLHSInAssignment */] = 'Invalid left-hand side in assignment';
ErrorMessages[69 /* MissingArrowAfterParentheses */] = 'Missing => after parentheses';
ErrorMessages[37 /* MissingAsImportSpecifier */] = 'Missing \'as\' keyword in import namespace specifier';
ErrorMessages[38 /* NoAsAfterImportNamespace */] = 'Missing \'as\' keyword after import namespace';
ErrorMessages[39 /* InvalidModuleSpecifier */] = 'Invalid module specifier';
ErrorMessages[40 /* NonEmptyJSXExpression */] = 'JSX attributes must only be assigned a non-empty  \'expression\'';
ErrorMessages[41 /* ExpectedJSXClosingTag */] = 'Expected corresponding JSX closing tag for %0';
ErrorMessages[42 /* AdjacentJSXElements */] = 'Adjacent JSX elements must be wrapped in an enclosing tag';
ErrorMessages[43 /* InvalidBinaryDigit */] = 'Invalid binary digit';
ErrorMessages[44 /* InvalidOctalDigit */] = 'Invalid octal digit';
ErrorMessages[45 /* StrictDelete */] = 'Delete of an unqualified identifier in strict mode.';
ErrorMessages[46 /* StrictLHSPrefix */] = 'Prefix increment/decrement may not have eval or arguments operand in strict mode';
ErrorMessages[47 /* StrictLHSPostfix */] = 'Postfix increment/decrement may not have eval or arguments operand in strict mode';
ErrorMessages[49 /* ExportDeclAtTopLevel */] = 'Export declarations may only appear at top level of a module';
ErrorMessages[50 /* ImportDeclAtTopLevel */] = 'Import declarations may only appear at top level of a module';
ErrorMessages[51 /* MissingMsgDeclarationAfterExport */] = 'Missing declaration after \'export\' keyword';
ErrorMessages[52 /* MissingMsgDeclarationAfterImport */] = 'Missing declaration after \'import\' keyword';
ErrorMessages[53 /* ForAwaitNotOf */] = 'For await loop should be used with \'of\'';
ErrorMessages[54 /* LetInLexicalBinding */] = 'let is disallowed as a lexically bound name';
ErrorMessages[55 /* UnexpectedComma */] = 'Unexpected token ,';
ErrorMessages[56 /* DuplicateProtoProperty */] = 'Property name __proto__ appears more than once in object literal';
ErrorMessages[57 /* StrictParamDupe */] = 'Duplicate argument names not allowed in this context';
ErrorMessages[58 /* InvalidHexEscapeSequence */] = 'Invalid hexadecimal escape sequence';
ErrorMessages[59 /* ConstructorSpecialMethod */] = 'Class constructor may not be an accessor';
ErrorMessages[60 /* BadSuperCall */] = 'super() is only valid in derived class constructors';
ErrorMessages[61 /* DuplicateConstructor */] = 'A class may only have one constructor';
ErrorMessages[63 /* ConstructorIsAsync */] = 'Class constructor may not be an async method';
ErrorMessages[62 /* StaticPrototype */] = 'Classes may not have static property named prototype';
ErrorMessages[65 /* ClassDeclarationNoName */] = 'Class declaration must have a name in this context';
ErrorMessages[66 /* FunctionDeclarationNoName */] = 'Function declaration must have a name in this context';
ErrorMessages[67 /* LineBreakAfterAsync */] = 'No line break is allowed after async';
ErrorMessages[68 /* UnexpectedEscapedKeyword */] = 'Unexpected escaped keyword';
ErrorMessages[70 /* InvalidParenthesizedPattern */] = 'Invalid parenthesized pattern';
ErrorMessages[71 /* DuplicateIdentifier */] = '\'%0\' has already been declared ';
ErrorMessages[72 /* DuplicateBinding */] = 'Duplicate binding';
ErrorMessages[73 /* Redeclaration */] = 'Label \'%0\' has already been declared';
ErrorMessages[74 /* UnknownLabel */] = 'Undefined label \'%0\'';
ErrorMessages[75 /* InvalidNewTargetContext */] = 'new.target expression is not allowed here';
ErrorMessages[76 /* UnexpectedReservedWord */] = 'Unexpected reserved word';
ErrorMessages[77 /* InvalidShorthandProperty */] = 'Invalid shorthand property';
ErrorMessages[78 /* InvalidShorthandAssignment */] = 'Shorthand property assignments are valid only in destructuring patterns';
ErrorMessages[79 /* UnterminatedTemplate */] = 'Unterminated template literal';
ErrorMessages[80 /* UnexpectedStrictReserved */] = 'Unexpected strict mode reserved word';
ErrorMessages[81 /* YieldReservedWord */] = 'yield is a reserved word inside generator functions';
ErrorMessages[82 /* StrictParamName */] = 'The identifier \'eval\' or \'arguments\' must not be in binding position in strict mode';
ErrorMessages[83 /* DisallowedInContext */] = '\'%0\' may not be used as an identifier in this context';
ErrorMessages[84 /* IllegalArrowInParamList */] = 'Illegal arrow function parameter list';
ErrorMessages[85 /* UnexpectedBigIntLiteral */] = 'Unexpected BigInt literal';
ErrorMessages[86 /* UnNamedClassStmt */] = 'Class statement requires a name';
ErrorMessages[87 /* UnNamedFunctionStmt */] = 'Function statement requires a name';
ErrorMessages[88 /* InvalidStrictExpPostion */] = 'The identifier \'%0\' must not be in expression position in strict mode';
ErrorMessages[89 /* InvalidStrictLexical */] = 'The identifier \'let\' must not be in binding position in strict mode';
ErrorMessages[90 /* MissingInitializer */] = 'Missing initializer';
ErrorMessages[91 /* InvalidLabeledForOf */] = 'The body of a for-of statement must not be a labeled function declaration';
ErrorMessages[92 /* InvalidVarDeclInForIn */] = 'Invalid variable declaration in for-in statement';
ErrorMessages[93 /* InvalidNoctalInteger */] = 'Unexpected noctal integer literal';
ErrorMessages[94 /* InvalidRadix */] = 'Expected number in radix';
ErrorMessages[95 /* UnexpectedTokenNumber */] = 'Unexpected number';
ErrorMessages[96 /* UnexpectedMantissa */] = 'Unexpected mantissa';
ErrorMessages[97 /* UnexpectedSurrogate */] = 'Unexpected surrogate pair';
ErrorMessages[98 /* ForbiddenAsStatement */] = '%0 can\'t appear in single-statement context';
ErrorMessages[99 /* InvalidAsyncGenerator */] = 'Generator function or method can\'t be async';
ErrorMessages[100 /* BadPropertyId */] = 'Invalid property id';
ErrorMessages[101 /* InvalidMethod */] = 'Only methods are allowed in classes';
ErrorMessages[102 /* InvalidArrowYieldParam */] = 'Arrow parameters must not contain yield expressions';
ErrorMessages[103 /* InvalidAwaitInArrowParam */] = '\'await\' is not allowed inside an async arrow\'s parameter list';
ErrorMessages[104 /* InvalidComplexBindingPattern */] = 'Complex binding patterns require an initialization value';
ErrorMessages[105 /* UnsupportedFeature */] = '%0 isn\'t supported by default. Enable the \'%1\' option to use them';
ErrorMessages[106 /* BadUntaggedTemplate */] = 'Bad escape sequence in untagged template literal';
ErrorMessages[107 /* TemplateOctalLiteral */] = 'Template literals may not contain octal escape sequences';
function constructError(msg, column) {
    var error = new Error(msg);
    try {
        throw error;
    }
    catch (base) {
        // istanbul ignore else
        if (Object.create && Object.defineProperty) {
            error = Object.create(base);
            Object.defineProperty(error, 'column', {
                value: column
            });
        }
    }
    // istanbul ignore next
    return error;
}
function createError(type, loc) {
    var params = [], len = arguments.length - 2;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 2 ];

    var description = ErrorMessages[type].replace(/%(\d+)/g, function (_, i) { return params[i]; });
    var error = constructError('Line ' + loc.line + ': ' + description, loc.column);
    error.index = loc.index;
    error.lineNumber = loc.line;
    error.description = description;
    return error;
}

// Unicode v. 10 support
var convert = (function (compressed, dict) {
    var result = new Uint32Array(104448);
    var index = 0;
    var subIndex = 0;
    while (index < 3293) {
        var inst = compressed[index++];
        if (inst < 0) {
            subIndex -= inst;
        }
        else {
            var code = compressed[index++];
            if (inst & 2)
                { code = dict[code]; }
            if (inst & 1) {
                result.fill(code, subIndex, subIndex += compressed[index++]);
            }
            else {
                result[subIndex++] = code;
            }
        }
    }
    return result;
})([-1, 2, 28, 2, 29, 2, 5, -1, 0, 77595648, 3, 41, 2, 3, 0, 14, 2, 52, 2, 53, 3, 0, 3, 0, 3168796671, 0, 4294956992, 2, 1, 2, 0, 2, 54, 3, 0, 4, 0, 4294966523, 3, 0, 4, 2, 55, 2, 56, 2, 4, 0, 4294836479, 0, 3221225471, 0, 4294901942, 2, 57, 0, 134152192, 3, 0, 2, 0, 4294951935, 3, 0, 2, 0, 2683305983, 0, 2684354047, 2, 17, 2, 0, 0, 4294961151, 3, 0, 2, 2, 20, 2, 0, 2, 59, 2, 0, 2, 125, 2, 6, 2, 19, -1, 2, 60, 2, 148, 2, 1, 3, 0, 3, 0, 4294901711, 2, 37, 0, 4089839103, 0, 2961209759, 0, 268697551, 0, 4294543342, 0, 3547201023, 0, 1577204103, 0, 4194240, 0, 4294688750, 2, 2, 0, 80831, 0, 4261478351, 0, 4294549486, 2, 2, 0, 2965387679, 0, 196559, 0, 3594373100, 0, 3288319768, 0, 8469959, 2, 167, 2, 3, 0, 3825204735, 0, 123747807, 0, 65487, 2, 3, 0, 4092591615, 0, 1080049119, 0, 458703, 2, 3, 2, 0, 0, 2163244511, 0, 4227923919, 0, 4236247020, 2, 64, 0, 4284449919, 0, 851904, 2, 4, 2, 16, 0, 67076095, -1, 2, 65, 0, 1006628014, 0, 4093591391, -1, 0, 50331649, 0, 3265266687, 2, 34, 0, 4294844415, 0, 4278190047, 2, 22, 2, 124, -1, 3, 0, 2, 2, 33, 2, 0, 2, 10, 2, 0, 2, 14, 2, 15, 3, 0, 10, 2, 66, 2, 0, 2, 67, 2, 68, 2, 69, 2, 0, 2, 70, 2, 0, 0, 3892314111, 0, 261632, 2, 27, 3, 0, 2, 2, 11, 2, 4, 3, 0, 18, 2, 71, 2, 5, 3, 0, 2, 2, 72, 0, 2088959, 2, 31, 2, 8, 0, 909311, 3, 0, 2, 0, 814743551, 2, 39, 0, 67057664, 3, 0, 2, 2, 9, 2, 0, 2, 32, 2, 0, 2, 18, 2, 7, 0, 268374015, 2, 30, 2, 46, 2, 0, 2, 73, 0, 134153215, -1, 2, 6, 2, 0, 2, 7, 0, 2684354559, 0, 67044351, 0, 1073676416, -2, 3, 0, 2, 2, 40, 0, 1046528, 3, 0, 3, 2, 8, 2, 0, 2, 9, 0, 4294960127, 2, 10, 2, 13, -1, 0, 4294377472, 2, 25, 3, 0, 7, 0, 4227858431, 3, 0, 8, 2, 11, 2, 0, 2, 75, 2, 10, 2, 0, 2, 76, 2, 77, 2, 78, -1, 2, 121, 0, 1048577, 2, 79, 2, 12, -1, 2, 12, 0, 131042, 2, 80, 2, 81, 2, 82, 2, 0, 2, 13, -83, 2, 0, 2, 49, 2, 7, 3, 0, 4, 0, 1046559, 2, 0, 2, 14, 2, 0, 0, 2147516671, 2, 23, 3, 83, 2, 2, 0, -16, 2, 84, 0, 524222462, 2, 4, 2, 0, 0, 4269801471, 2, 4, 2, 0, 2, 15, 2, 74, 2, 86, 3, 0, 2, 2, 43, 2, 16, -1, 2, 17, -16, 3, 0, 205, 2, 18, -2, 3, 0, 655, 2, 19, 3, 0, 36, 2, 47, -1, 2, 17, 2, 10, 3, 0, 8, 2, 87, 2, 117, 2, 0, 0, 3220242431, 3, 0, 3, 2, 20, 2, 21, 2, 88, 3, 0, 2, 2, 89, 2, 90, -1, 2, 21, 2, 0, 2, 26, 2, 0, 2, 8, 3, 0, 2, 0, 67043391, 0, 687865855, 2, 0, 2, 24, 2, 8, 2, 22, 3, 0, 2, 0, 67076097, 2, 7, 2, 0, 2, 23, 0, 67059711, 0, 4236247039, 3, 0, 2, 0, 939524103, 0, 8191999, 2, 94, 2, 95, 2, 15, 2, 92, 3, 0, 3, 0, 67057663, 3, 0, 349, 2, 96, 2, 97, 2, 6, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 25, -1, 0, 3774349439, 2, 98, 2, 99, 3, 0, 2, 2, 20, 2, 100, 3, 0, 10, 2, 10, 2, 17, 2, 0, 2, 42, 2, 0, 2, 26, 2, 101, 2, 27, 0, 1638399, 2, 165, 2, 102, 3, 0, 3, 2, 22, 2, 28, 2, 29, 2, 5, 2, 30, 2, 0, 2, 7, 2, 103, -1, 2, 104, 2, 105, 2, 106, -1, 3, 0, 3, 2, 16, -2, 2, 0, 2, 31, -3, 2, 144, -4, 2, 22, 2, 0, 2, 107, 0, 1, 2, 0, 2, 58, 2, 32, 2, 16, 2, 10, 2, 0, 2, 108, -1, 3, 0, 4, 2, 10, 2, 33, 2, 109, 2, 6, 2, 0, 2, 110, 2, 0, 2, 44, -4, 3, 0, 9, 2, 23, 2, 18, 2, 26, -4, 2, 111, 2, 112, 2, 18, 2, 23, 2, 7, -2, 2, 113, 2, 18, 2, 25, -2, 2, 0, 2, 114, -2, 0, 4277137519, 0, 2265972735, -1, 3, 22, 2, -1, 2, 34, 2, 36, 2, 0, 3, 18, 2, 2, 35, 2, 20, -3, 3, 0, 2, 2, 13, -1, 2, 0, 2, 35, 2, 0, 2, 35, -24, 3, 0, 2, 2, 36, 0, 2147549120, 2, 0, 2, 16, 2, 17, 2, 128, 2, 0, 2, 48, 2, 17, 0, 5242879, 3, 0, 2, 0, 402594847, -1, 2, 116, 0, 1090519039, -2, 2, 118, 2, 119, 2, 0, 2, 38, 2, 37, 2, 2, 0, 3766565279, 0, 2039759, -4, 3, 0, 2, 2, 38, -1, 3, 0, 2, 0, 67043519, -5, 2, 0, 0, 4282384383, 0, 1056964609, -1, 3, 0, 2, 0, 67043345, -1, 2, 0, 2, 9, 2, 39, -1, 0, 3825205247, 2, 40, -11, 3, 0, 2, 0, 2147484671, -8, 2, 0, 2, 7, 0, 4294901888, 2, 0, 0, 67108815, -1, 2, 0, 2, 45, -8, 2, 50, 2, 41, 0, 67043329, 2, 122, 2, 42, 0, 8388351, -2, 2, 123, 0, 3028287487, 0, 67043583, -21, 3, 0, 28, 2, 25, -3, 3, 0, 3, 2, 43, 3, 0, 6, 2, 44, -85, 3, 0, 33, 2, 43, -126, 3, 0, 18, 2, 36, -269, 3, 0, 17, 2, 45, 2, 7, 2, 39, -2, 2, 17, 2, 46, 2, 0, 2, 23, 0, 67043343, 2, 126, 2, 27, -27, 3, 0, 2, 0, 4294901791, 2, 7, 2, 187, -2, 0, 3, 3, 0, 191, 2, 47, 3, 0, 23, 2, 35, -296, 3, 0, 8, 2, 7, -2, 2, 17, 3, 0, 11, 2, 6, -72, 3, 0, 3, 2, 127, 0, 1677656575, -166, 0, 4161266656, 0, 4071, 0, 15360, -4, 0, 28, -13, 3, 0, 2, 2, 48, 2, 0, 2, 129, 2, 130, 2, 51, 2, 0, 2, 131, 2, 132, 2, 133, 3, 0, 10, 2, 134, 2, 135, 2, 15, 3, 48, 2, 3, 49, 2, 3, 50, 2, 0, 4294954999, 2, 0, -16, 2, 0, 2, 85, 2, 0, 0, 2105343, 0, 4160749584, 2, 194, -42, 0, 4194303871, 0, 2011, -62, 3, 0, 6, 0, 8323103, -1, 3, 0, 2, 2, 38, -37, 2, 51, 2, 138, 2, 139, 2, 140, 2, 141, 2, 142, -138, 3, 0, 1334, 2, 23, -1, 3, 0, 129, 2, 31, 3, 0, 6, 2, 10, 3, 0, 180, 2, 143, 3, 0, 233, 0, 1, -96, 3, 0, 16, 2, 10, -22583, 3, 0, 7, 2, 27, -6130, 3, 5, 2, -1, 0, 69207040, 3, 41, 2, 3, 0, 14, 2, 52, 2, 53, -3, 0, 3168731136, 0, 4294956864, 2, 1, 2, 0, 2, 54, 3, 0, 4, 0, 4294966275, 3, 0, 4, 2, 55, 2, 56, 2, 4, 2, 26, -1, 2, 17, 2, 57, -1, 2, 0, 2, 19, 0, 4294885376, 3, 0, 2, 0, 3145727, 0, 2617294944, 0, 4294770688, 2, 27, 2, 58, 3, 0, 2, 0, 131135, 2, 91, 0, 70256639, 2, 59, 0, 272, 2, 45, 2, 19, -1, 2, 60, -2, 2, 93, 0, 603979775, 0, 4278255616, 0, 4294836227, 0, 4294549473, 0, 600178175, 0, 2952806400, 0, 268632067, 0, 4294543328, 0, 57540095, 0, 1577058304, 0, 1835008, 0, 4294688736, 2, 61, 2, 62, 0, 33554435, 2, 120, 2, 61, 2, 145, 0, 131075, 0, 3594373096, 0, 67094296, 2, 62, -1, 2, 63, 0, 603979263, 2, 153, 0, 3, 0, 4294828001, 0, 602930687, 2, 175, 0, 393219, 2, 63, 0, 671088639, 0, 2154840064, 0, 4227858435, 0, 4236247008, 2, 64, 2, 36, -1, 2, 4, 0, 917503, 2, 36, -1, 2, 65, 0, 537783470, 0, 4026531935, -1, 0, 1, -1, 2, 34, 2, 47, 0, 7936, -3, 2, 0, 0, 2147485695, 0, 1010761728, 0, 4292984930, 0, 16387, 2, 0, 2, 14, 2, 15, 3, 0, 10, 2, 66, 2, 0, 2, 67, 2, 68, 2, 69, 2, 0, 2, 70, 2, 0, 2, 16, -1, 2, 27, 3, 0, 2, 2, 11, 2, 4, 3, 0, 18, 2, 71, 2, 5, 3, 0, 2, 2, 72, 0, 253951, 3, 20, 2, 0, 122879, 2, 0, 2, 8, 0, 276824064, -2, 3, 0, 2, 2, 9, 2, 0, 0, 4294903295, 2, 0, 2, 18, 2, 7, -1, 2, 17, 2, 46, 2, 0, 2, 73, 2, 39, -1, 2, 23, 2, 0, 2, 31, -2, 0, 128, -2, 2, 74, 2, 8, 0, 4064, -1, 2, 115, 0, 4227907585, 2, 0, 2, 191, 2, 0, 2, 44, 0, 4227915776, 2, 10, 2, 13, -2, 0, 6544896, 3, 0, 6, -2, 3, 0, 8, 2, 11, 2, 0, 2, 75, 2, 10, 2, 0, 2, 76, 2, 77, 2, 78, -3, 2, 79, 2, 12, -3, 2, 80, 2, 81, 2, 82, 2, 0, 2, 13, -83, 2, 0, 2, 49, 2, 7, 3, 0, 4, 0, 817183, 2, 0, 2, 14, 2, 0, 0, 33023, 2, 23, 3, 83, 2, -17, 2, 84, 0, 524157950, 2, 4, 2, 0, 2, 85, 2, 4, 2, 0, 2, 15, 2, 74, 2, 86, 3, 0, 2, 2, 43, 2, 16, -1, 2, 17, -16, 3, 0, 205, 2, 18, -2, 3, 0, 655, 2, 19, 3, 0, 36, 2, 47, -1, 2, 17, 2, 10, 3, 0, 8, 2, 87, 0, 3072, 2, 0, 0, 2147516415, 2, 10, 3, 0, 2, 2, 27, 2, 21, 2, 88, 3, 0, 2, 2, 89, 2, 90, -1, 2, 21, 0, 4294965179, 0, 7, 2, 0, 2, 8, 2, 88, 2, 8, -1, 0, 687603712, 2, 91, 2, 92, 2, 36, 2, 22, 2, 93, 2, 35, 2, 159, 0, 2080440287, 2, 0, 2, 13, 2, 136, 0, 3296722943, 2, 0, 0, 1046675455, 0, 939524101, 0, 1837055, 2, 94, 2, 95, 2, 15, 2, 92, 3, 0, 3, 0, 7, 3, 0, 349, 2, 96, 2, 97, 2, 6, -264, 3, 0, 11, 2, 24, 3, 0, 2, 2, 25, -1, 0, 2700607615, 2, 98, 2, 99, 3, 0, 2, 2, 20, 2, 100, 3, 0, 10, 2, 10, 2, 17, 2, 0, 2, 42, 2, 0, 2, 26, 2, 101, -3, 2, 102, 3, 0, 3, 2, 22, -1, 3, 5, 2, 2, 30, 2, 0, 2, 7, 2, 103, -1, 2, 104, 2, 105, 2, 106, -1, 3, 0, 3, 2, 16, -2, 2, 0, 2, 31, -8, 2, 22, 2, 0, 2, 107, -1, 2, 0, 2, 58, 2, 32, 2, 18, 2, 10, 2, 0, 2, 108, -1, 3, 0, 4, 2, 10, 2, 17, 2, 109, 2, 6, 2, 0, 2, 110, 2, 0, 2, 44, -4, 3, 0, 9, 2, 23, 2, 18, 2, 26, -4, 2, 111, 2, 112, 2, 18, 2, 23, 2, 7, -2, 2, 113, 2, 18, 2, 25, -2, 2, 0, 2, 114, -2, 0, 4277075969, 2, 8, -1, 3, 22, 2, -1, 2, 34, 2, 137, 2, 0, 3, 18, 2, 2, 35, 2, 20, -3, 3, 0, 2, 2, 13, -1, 2, 0, 2, 35, 2, 0, 2, 35, -24, 2, 115, 2, 9, -2, 2, 115, 2, 27, 2, 17, 2, 13, 2, 115, 2, 36, 2, 17, 0, 4718591, 2, 115, 2, 35, 0, 335544350, -1, 2, 116, 2, 117, -2, 2, 118, 2, 119, 2, 7, -1, 2, 120, 2, 61, 0, 3758161920, 0, 3, -4, 2, 0, 2, 31, 2, 170, -1, 2, 0, 2, 27, 0, 176, -5, 2, 0, 2, 43, 2, 177, -1, 2, 0, 2, 27, 2, 189, -1, 2, 0, 2, 19, -2, 2, 25, -12, 3, 0, 2, 2, 121, -8, 0, 4294965249, 0, 67633151, 0, 4026597376, 2, 0, 0, 975, -1, 2, 0, 2, 45, -8, 2, 50, 2, 43, 0, 1, 2, 122, 2, 27, -3, 2, 123, 2, 107, 2, 124, -21, 3, 0, 28, 2, 25, -3, 3, 0, 3, 2, 43, 3, 0, 6, 2, 44, -85, 3, 0, 33, 2, 43, -126, 3, 0, 18, 2, 36, -269, 3, 0, 17, 2, 45, 2, 7, -3, 2, 17, 2, 125, 2, 0, 2, 27, 2, 44, 2, 126, 2, 27, -27, 3, 0, 2, 0, 65567, -1, 2, 100, -2, 0, 3, 3, 0, 191, 2, 47, 3, 0, 23, 2, 35, -296, 3, 0, 8, 2, 7, -2, 2, 17, 3, 0, 11, 2, 6, -72, 3, 0, 3, 2, 127, 2, 128, -187, 3, 0, 2, 2, 48, 2, 0, 2, 129, 2, 130, 2, 51, 2, 0, 2, 131, 2, 132, 2, 133, 3, 0, 10, 2, 134, 2, 135, 2, 15, 3, 48, 2, 3, 49, 2, 3, 50, 2, 2, 136, -129, 3, 0, 6, 2, 137, -1, 3, 0, 2, 2, 44, -37, 2, 51, 2, 138, 2, 139, 2, 140, 2, 141, 2, 142, -138, 3, 0, 1334, 2, 23, -1, 3, 0, 129, 2, 31, 3, 0, 6, 2, 10, 3, 0, 180, 2, 143, 3, 0, 233, 0, 1, -96, 3, 0, 16, 2, 10, -28719, 2, 0, 0, 1, -1, 2, 121, 2, 0, 0, 8193, -21, 0, 50331648, 0, 10255, 0, 4, -11, 2, 62, 2, 163, 0, 1, 0, 71936, -1, 2, 154, 0, 4292933632, 0, 805306431, -5, 2, 144, -1, 2, 172, -1, 0, 6144, -2, 2, 122, -1, 2, 164, -1, 2, 150, 2, 145, 2, 158, 2, 0, 0, 3223322624, 2, 8, 0, 4, -4, 2, 183, 0, 205128192, 0, 1333757536, 0, 3221225520, 0, 423953, 0, 747766272, 0, 2717763192, 0, 4290773055, 0, 278545, 2, 146, 0, 4294886464, 0, 33292336, 0, 417809, 2, 146, 0, 1329579616, 0, 4278190128, 0, 700594195, 0, 1006647527, 0, 4286497336, 0, 4160749631, 2, 147, 0, 469762560, 0, 4171219488, 0, 16711728, 2, 147, 0, 202375680, 0, 3214918176, 0, 4294508592, 2, 147, -1, 0, 983584, 0, 48, 0, 58720275, 0, 3489923072, 0, 10517376, 0, 4293066815, 0, 1, 0, 2013265920, 2, 171, 2, 0, 0, 17816169, 0, 3288339281, 0, 201375904, 2, 0, -2, 0, 256, 0, 122880, 0, 16777216, 2, 144, 0, 4160757760, 2, 0, -6, 2, 160, -11, 0, 3263218176, -1, 0, 49664, 0, 2160197632, 0, 8388802, -1, 0, 12713984, -1, 0, 402653184, 2, 152, 2, 155, -2, 2, 156, -20, 0, 3758096385, -2, 2, 185, 0, 4292878336, 2, 21, 2, 148, 0, 4294057984, -2, 2, 157, 2, 149, 2, 168, -2, 2, 166, -1, 2, 174, -1, 2, 162, 2, 121, 0, 4026593280, 0, 14, 0, 4292919296, -1, 2, 151, 0, 939588608, -1, 0, 805306368, -1, 2, 121, 0, 1610612736, 2, 149, 2, 150, 3, 0, 2, -2, 2, 151, 2, 152, -3, 0, 267386880, -1, 2, 153, 0, 7168, -1, 2, 180, 2, 0, 2, 154, 2, 155, -7, 2, 161, -8, 2, 156, -1, 0, 1426112704, 2, 157, -1, 2, 181, 0, 271581216, 0, 2149777408, 2, 27, 2, 154, 2, 121, 0, 851967, 0, 3758129152, -1, 2, 27, 2, 173, -4, 2, 151, -20, 2, 188, 2, 158, -56, 0, 3145728, 2, 179, 2, 184, 0, 4294443520, 2, 73, -1, 2, 159, 2, 121, -4, 0, 32505856, -1, 2, 160, -1, 0, 2147385088, 2, 21, 1, 2155905152, 2, -3, 2, 91, 2, 0, 2, 161, -2, 2, 148, -6, 2, 162, 0, 4026597375, 0, 1, -1, 0, 1, -1, 2, 163, -3, 2, 137, 2, 190, -2, 2, 159, 2, 164, -1, 2, 169, 2, 121, -6, 2, 121, -213, 2, 162, -657, 2, 158, -36, 2, 165, -1, 0, 65408, -10, 2, 193, -5, 2, 166, -5, 0, 4278222848, 2, 0, 2, 23, -1, 0, 4227919872, -1, 2, 166, -2, 0, 4227874752, 2, 157, -2, 0, 2146435072, 2, 152, -2, 0, 1006649344, 2, 121, -1, 2, 21, 0, 201375744, -3, 0, 134217720, 2, 21, 0, 4286677377, 0, 32896, -1, 2, 167, -3, 2, 168, -349, 2, 169, 2, 170, 2, 171, 3, 0, 264, -11, 2, 172, -2, 2, 155, 2, 0, 0, 520617856, 0, 2692743168, 0, 36, -3, 0, 524284, -11, 2, 27, -1, 2, 178, -1, 2, 176, 0, 3221291007, 2, 155, -1, 0, 524288, 0, 2158720, -3, 2, 152, 0, 1, -4, 2, 121, 0, 3808625411, 0, 3489628288, 0, 4096, 0, 1207959680, 0, 3221274624, 2, 0, -3, 2, 164, 0, 120, 0, 7340032, -2, 0, 4026564608, 2, 4, 2, 27, 2, 157, 3, 0, 4, 2, 152, -1, 2, 173, 2, 171, -1, 0, 8176, 2, 174, 2, 164, 2, 175, -1, 0, 4290773232, 2, 0, -4, 2, 157, 2, 182, 0, 15728640, 2, 171, -1, 2, 154, -1, 0, 4294934512, 3, 0, 4, -9, 2, 21, 2, 162, 2, 176, 3, 0, 4, 0, 704, 0, 1849688064, 0, 4194304, -1, 2, 121, 0, 4294901887, 2, 0, 0, 130547712, 0, 1879048192, 0, 2080374784, 3, 0, 2, -1, 2, 177, 2, 178, -1, 0, 17829776, 0, 2028994560, 0, 4261478144, -2, 2, 0, -1, 0, 4286580608, -1, 0, 29360128, 2, 179, 0, 16252928, 0, 3791388672, 2, 119, 3, 0, 2, -2, 2, 180, 2, 0, -1, 2, 100, -1, 0, 66584576, 3, 0, 11, 2, 121, 3, 0, 12, -2, 0, 245760, 0, 2147418112, -1, 2, 144, 2, 195, 0, 4227923456, -1, 2, 181, 2, 169, 2, 21, -2, 2, 172, 0, 4292870145, 0, 262144, 2, 121, 3, 0, 2, 0, 1073758848, 2, 182, -1, 0, 4227921920, 2, 183, 2, 146, 0, 528402016, 0, 4292927536, 3, 0, 4, -2, 0, 3556769792, 2, 0, -2, 2, 186, 3, 0, 5, -1, 2, 179, 2, 157, 2, 0, -2, 0, 4227923936, 2, 58, -1, 2, 166, 2, 91, 2, 0, 2, 184, 2, 151, 3, 0, 11, -2, 0, 2146959360, 3, 0, 8, -2, 2, 154, -1, 0, 536870960, 2, 115, -1, 2, 185, 3, 0, 8, 0, 512, 0, 8388608, 2, 167, 2, 165, 2, 178, 0, 4286578944, 3, 0, 2, 0, 1152, 0, 1266679808, 2, 186, 3, 0, 21, -28, 2, 155, 3, 0, 3, -3, 0, 4292902912, -6, 2, 93, 3, 0, 85, -33, 2, 187, 3, 0, 126, -18, 2, 188, 3, 0, 269, -17, 2, 185, 2, 121, 0, 4294917120, 3, 0, 2, 2, 27, 0, 4290822144, -2, 0, 67174336, 0, 520093700, 2, 17, 3, 0, 27, -2, 0, 65504, 2, 121, 2, 43, 3, 0, 2, 2, 88, -191, 2, 58, -23, 2, 100, 3, 0, 296, -8, 2, 121, 3, 0, 2, 2, 27, -11, 2, 171, 3, 0, 72, -3, 0, 3758159872, 0, 201391616, 3, 0, 155, -7, 2, 162, -1, 0, 384, -1, 0, 133693440, -3, 2, 180, -2, 2, 30, 3, 0, 5, -2, 2, 21, 2, 122, 3, 0, 4, -2, 2, 181, -1, 2, 144, 0, 335552923, 2, 189, -1, 0, 538974272, 0, 2214592512, 0, 132000, -10, 0, 192, -8, 0, 12288, -21, 0, 134213632, 0, 4294901761, 3, 0, 42, 0, 100663424, 0, 4294965284, 3, 0, 62, -6, 0, 4286578784, 2, 0, -2, 0, 1006696448, 3, 0, 37, 2, 189, 0, 4110942569, 0, 1432950139, 0, 2701658217, 0, 4026532864, 0, 4026532881, 2, 0, 2, 42, 3, 0, 8, -1, 2, 151, -2, 2, 148, 2, 190, 0, 65537, 2, 162, 2, 165, 2, 159, -1, 2, 151, -1, 2, 58, 2, 0, 2, 191, 0, 65528, 2, 171, 0, 4294770176, 2, 30, 3, 0, 4, -30, 2, 192, 0, 4261470208, -3, 2, 148, -2, 2, 192, 2, 0, 2, 151, -1, 2, 186, -1, 2, 154, 0, 4294950912, 3, 0, 2, 2, 151, 2, 121, 2, 165, 2, 193, 2, 166, 2, 0, 2, 194, 2, 188, 3, 0, 48, -1334, 2, 21, 2, 0, -129, 2, 192, -6, 2, 157, -180, 2, 195, -233, 2, 4, 3, 0, 96, -16, 2, 157, 3, 0, 22583, -7, 2, 17, 3, 0, 6128], [4294967295, 4294967291, 4092460543, 4294828015, 4294967294, 134217726, 268435455, 2147483647, 1048575, 16777215, 1073741823, 1061158911, 536805376, 511, 4294910143, 4160749567, 134217727, 4294901760, 4194303, 2047, 262143, 4286578688, 536870911, 8388607, 4294918143, 67108863, 255, 65535, 67043328, 2281701374, 4294967232, 2097151, 4294903807, 4294902783, 4294967039, 524287, 127, 4294549487, 67045375, 1023, 67047423, 4286578687, 4294770687, 32767, 15, 33554431, 2047999, 8191, 4292870143, 4294934527, 4294966783, 4294967279, 262083, 20511, 4290772991, 4294901759, 41943039, 460799, 4294959104, 71303167, 1071644671, 602799615, 65536, 4294828000, 805044223, 4277151126, 1031749119, 4294917631, 2134769663, 4286578493, 4282253311, 4294942719, 33540095, 4294905855, 4294967264, 2868854591, 1608515583, 265232348, 534519807, 2147614720, 1060109444, 4093640016, 17376, 2139062143, 224, 4169138175, 4294868991, 4294909951, 4294967292, 4294965759, 16744447, 4294966272, 4294901823, 4294967280, 8289918, 4294934399, 4294901775, 4294965375, 1602223615, 4294967259, 4294443008, 268369920, 4292804608, 486341884, 4294963199, 3087007615, 1073692671, 131071, 4128527, 4279238655, 4294902015, 4294966591, 2445279231, 3670015, 3238002687, 4294967288, 4294705151, 4095, 3221208447, 4294902271, 4294549472, 2147483648, 4294705152, 4294966143, 64, 16383, 3774873592, 536807423, 67043839, 3758096383, 3959414372, 3755993023, 2080374783, 4294835295, 4294967103, 4160749565, 4087, 31, 184024726, 2862017156, 1593309078, 268434431, 268434414, 4294901763, 536870912, 2952790016, 202506752, 139280, 4293918720, 4227922944, 2147532800, 61440, 3758096384, 117440512, 65280, 4227858432, 3233808384, 3221225472, 4294965248, 32768, 57152, 67108864, 4290772992, 25165824, 4160749568, 57344, 4278190080, 65472, 4227907584, 65520, 1920, 4026531840, 49152, 4294836224, 63488, 1073741824, 4294967040, 251658240, 196608, 12582912, 4294966784, 2097152, 64512, 417808, 469762048, 4261412864, 4227923712, 4294934528, 4294967168, 16, 98304, 63, 4292870144, 4294963200, 65534, 65532]);
var isvalidIdentifierContinue = function (cp) { return (convert[(cp >>> 5) + 0] >>> cp & 31 & 1) !== 0; };
var isValidIdentifierStart = function (cp) { return (convert[(cp >>> 5) + 34816] >>> cp & 31 & 1) !== 0; };
var isIdentifierStart = function (cp) { return (cp === 36 /* Dollar */) || (cp === 95 /* Underscore */) || // $ (dollar) and _ (underscore)
    (cp >= 65 /* UpperA */ && cp <= 90 /* UpperZ */) || // A..Z
    (cp >= 97 /* LowerA */ && cp <= 122 /* LowerZ */) || // a..z
    (cp === 92 /* Backslash */) || isValidIdentifierStart(cp); };
var isIdentifierPart = function (cp) { return (cp === 36 /* Dollar */) || (cp === 95 /* Underscore */) || // $ (dollar) and _ (underscore)
    (cp >= 65 /* UpperA */ && cp <= 90 /* UpperZ */) || // A..Z
    (cp >= 97 /* LowerA */ && cp <= 122 /* LowerZ */) || // a..z
    (cp >= 48 /* Zero */ && cp <= 57 /* Nine */) || // 0..9
    (cp === 92 /* Backslash */) || isvalidIdentifierContinue(cp); };

var Parser = function Parser(source, options) {
    this.flags = 0 /* None */;
    this.source = source;
    this.index = 0;
    this.column = 0;
    this.line = 1;
    this.lastIndex = 0;
    this.lastColumn = 0;
    this.lastLine = 0;
    this.startIndex = 0;
    this.startColumn = 0;
    this.startLine = 0;
    this.tokenRaw = '';
    this.token = 0;
    this.tokenValue = undefined;
    this.labelSet = undefined;
    this.errorLocation = undefined;
    this.tokenRegExp = undefined;
    this.functionScope = undefined;
    this.blockScope = undefined;
    this.parentScope = undefined;
    this.comments = undefined;
    this.delegate = undefined;
    this.lastChar = undefined;
    this.firstProto = undefined;
    if (options.next)
        { this.flags |= 2097152 /* OptionsNext */; }
    if (options.comments)
        { this.flags |= 8388608 /* OptionsComments */; }
    if (options.delegate)
        { this.flags |= 16777216 /* OptionsDelegate */; }
    if (options.jsx)
        { this.flags |= 524288 /* OptionsJSX */; }
    if (options.locations)
        { this.flags |= 131072 /* OptionsLoc */; }
    if (options.source)
        { this.flags |= 262144 /* OptionsSource */; }
    if (options.ranges)
        { this.flags |= 65536 /* OptionsRanges */; }
    if (options.raw)
        { this.flags |= 1048576 /* OptionsRaw */; }
    if (options.globalReturn)
        { this.flags |= 67108864 /* OptionsGlobalReturn */; }
    if (options.directives)
        { this.flags |= 4194304 /* OptionsDirectives */; }
    if (options.v8)
        { this.flags |= 33554432 /* OptionsV8 */; }
    if (this.flags & 8388608 /* OptionsComments */)
        { this.comments = options.comments; }
    if (this.flags & 16777216 /* OptionsDelegate */)
        { this.delegate = options.delegate; }
    if (this.flags & (131072 /* OptionsLoc */ | 262144 /* OptionsSource */))
        { this.locSource = String(options.source); }
};
Parser.prototype.parse = function parse (context) {
    this.nextToken(context);
    var body = context & 1 /* Module */ ?
        this.parseModuleItemList(context | 4 /* AllowIn */) :
        this.parseStatementList(context, 0 /* EndOfSource */);
    var node = {
        type: 'Program',
        body: body,
        sourceType: context & 1 /* Module */ ? 'module' : 'script'
    };
    if (this.flags & 65536 /* OptionsRanges */) {
        node.start = 0;
        node.end = this.source.length;
    }
    if (this.flags & 131072 /* OptionsLoc */) {
        node.loc = {
            start: {
                line: 1,
                column: 0,
            },
            end: {
                line: this.line,
                column: this.column
            }
        };
    }
    return node;
};
Parser.prototype.error = function error (type) {
        var params = [], len = arguments.length - 1;
        while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    if (this.errorLocation)
        { throw createError.apply(void 0, [ type, this.errorLocation ].concat( params )); }
    throw createError.apply(void 0, [ type, this.getLocations() ].concat( params ));
};
// Throw an unexpected token error
Parser.prototype.throwUnexpectedToken = function throwUnexpectedToken () {
    this.error(1 /* UnexpectedToken */, tokenDesc(this.token));
};
Parser.prototype.saveState = function saveState () {
    return {
        index: this.index,
        column: this.column,
        line: this.line,
        startLine: this.startLine,
        lastLine: this.lastLine,
        startColumn: this.startColumn,
        lastColumn: this.lastColumn,
        token: this.token,
        tokenValue: this.tokenValue,
        tokenRaw: this.tokenRaw,
        startIndex: this.startIndex,
        lastIndex: this.lastIndex,
        tokenRegExp: this.tokenRegExp,
        flags: this.flags
    };
};
Parser.prototype.rewindState = function rewindState (state) {
    this.index = state.index;
    this.column = state.column;
    this.line = state.line;
    this.token = state.token;
    this.tokenValue = state.tokenValue;
    this.startIndex = state.startIndex;
    this.lastIndex = state.lastIndex;
    this.lastLine = state.lastLine;
    this.startLine = state.startLine;
    this.startColumn = state.startColumn;
    this.lastColumn = state.lastColumn;
    this.tokenRegExp = state.tokenRegExp;
    this.tokenRaw = state.tokenRaw;
    this.flags = state.flags;
};
Parser.prototype.nextToken = function nextToken (context) {
    this.token = this.scanToken(context);
};
Parser.prototype.hasNext = function hasNext () {
    return this.index < this.source.length;
};
Parser.prototype.nextChar = function nextChar () {
    return this.source.charCodeAt(this.index);
};
Parser.prototype.storeRaw = function storeRaw (start) {
    this.tokenRaw = this.source.slice(start, this.index);
};
Parser.prototype.scanNext = function scanNext (ch, err /* UnterminatedString */) {
        if ( err === void 0 ) err = 3;

    this.advance();
    if (ch & 0x10000)
        { this.index++; }
    if (!this.hasNext())
        { this.error(err); }
    return this.nextUnicodeChar();
};
Parser.prototype.nextUnicodeChar = function nextUnicodeChar () {
    var index = this.index;
    var hi = this.source.charCodeAt(index++);
    if (hi < 0xd800 || hi > 0xdbff)
        { return hi; }
    if (index === this.source.length)
        { return hi; }
    var lo = this.source.charCodeAt(index);
    if (lo < 0xdc00 || lo > 0xdfff)
        { return hi; }
    return (hi & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
};
Parser.prototype.advance = function advance () {
    this.index++;
    this.column++;
};
Parser.prototype.advanceNewline = function advanceNewline () {
    this.index++;
    this.column = 0;
    this.line++;
};
Parser.prototype.consumeLineFeed = function consumeLineFeed (state) {
    this.index++;
    if (!(state & 2 /* LastIsCR */)) {
        this.column = 0;
        this.line++;
    }
};
Parser.prototype.consume = function consume (code) {
    if (this.nextChar() !== code)
        { return false; }
    this.advance();
    return true;
};
/**
 * Scan the entire source code. Skips whitespace and comments, and
 * return the token at the given index.
 *
 * @param context Context
 */
Parser.prototype.scanToken = function scanToken (context) {
        var this$1 = this;

    this.flags &= ~(1 /* LineTerminator */ | 2 /* HasUnicode */);
    this.lastIndex = this.index;
    this.lastColumn = this.column;
    this.lastLine = this.line;
    var state = this.index === 0 ? 4 /* LineStart */ : 0;
    while (this.hasNext()) {
        this$1.startIndex = this$1.index;
        this$1.startColumn = this$1.column;
        this$1.startLine = this$1.line;
        var first = this$1.nextChar();
        switch (first) {
            case 13 /* CarriageReturn */:
                state |= 2 /* LastIsCR */ | 4 /* LineStart */;
                this$1.flags |= 1 /* LineTerminator */;
                this$1.advanceNewline();
                continue;
            case 10 /* LineFeed */:
                this$1.consumeLineFeed(state);
                this$1.flags |= 1 /* LineTerminator */;
                state = state & ~2 /* LastIsCR */ | 4 /* LineStart */;
                continue;
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                state = state & ~2 /* LastIsCR */ | 4 /* LineStart */;
                this$1.flags |= 1 /* LineTerminator */;
                this$1.advanceNewline();
                continue;
            case 9 /* Tab */:
            case 11 /* VerticalTab */:
            case 12 /* FormFeed */:
            case 32 /* Space */:
            case 160 /* NonBreakingSpace */:
            case 5760 /* Ogham */:
            case 8192 /* EnQuad */:
            case 8193 /* EmQuad */:
            case 8194 /* EnSpace */:
            case 8195 /* EmSpace */:
            case 8196 /* ThreePerEmSpace */:
            case 8197 /* FourPerEmSpace */:
            case 8198 /* SixPerEmSpace */:
            case 8199 /* FigureSpace */:
            case 8200 /* PunctuationSpace */:
            case 8201 /* ThinSpace */:
            case 8202 /* HairSpace */:
            case 8239 /* NarrowNoBreakSpace */:
            case 8287 /* MathematicalSpace */:
            case 12288 /* IdeographicSpace */:
            case 65279 /* ZeroWidthNoBreakSpace */:
                this$1.advance();
                continue;
            // `/`, `/=`, `/>`
            case 47 /* Slash */:
                {
                    this$1.advance();
                    var next = this$1.nextChar();
                    if (this$1.consume(47 /* Slash */)) {
                        this$1.skipComments(state | 16 /* SingleLine */);
                        continue;
                    }
                    else if (this$1.consume(42 /* Asterisk */)) {
                        this$1.skipComments(state | 8 /* MultiLine */);
                        continue;
                    }
                    else if (this$1.consume(61 /* EqualSign */)) {
                        return 1310757 /* DivideAssign */;
                    }
                    return 2361909 /* Divide */;
                }
            // `<`, `<=`, `<<`, `<<=`, `</`,  <!--
            case 60 /* LessThan */:
                {
                    this$1.advance();
                    var next$1 = this$1.nextChar();
                    if (!(context & 1 /* Module */) && next$1 === 33 /* Exclamation */) {
                        this$1.advance();
                        if (this$1.consume(45 /* Hyphen */) &&
                            this$1.consume(45 /* Hyphen */)) {
                            this$1.skipComments(state | 16 /* SingleLine */);
                        }
                        continue;
                    }
                    switch (next$1) {
                        case 60 /* LessThan */:
                            this$1.advance();
                            if (this$1.consume(61 /* EqualSign */)) {
                                return 1310750 /* ShiftLeftAssign */;
                            }
                            return 2099265 /* ShiftLeft */;
                        case 61 /* EqualSign */:
                            this$1.advance();
                            return 2099005 /* LessThanOrEqual */;
                        case 47 /* Slash */:
                            {
                                if (!(this$1.flags & 524288 /* OptionsJSX */))
                                    { return 2361151 /* LessThan */; }
                                this$1.advance();
                                return 25 /* JSXClose */;
                            }
                        default:
                            return 2361151 /* LessThan */;
                    }
                }
            // -, --, -->, -=,
            case 45 /* Hyphen */:
                {
                    this$1.advance(); // skip '-'
                    var next$2 = this$1.nextChar();
                    if (next$2 === 45 /* Hyphen */) {
                        this$1.advance();
                        if (context & 1 /* Module */ || !(state & 4 /* LineStart */))
                            { return 786460 /* Decrement */; }
                        if (!this$1.consume(62 /* GreaterThan */))
                            { return 786460 /* Decrement */; }
                        this$1.skipComments(state | 16 /* SingleLine */);
                        continue;
                    }
                    else if (next$2 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310755 /* SubtractAssign */;
                    }
                    else {
                        return 6555952 /* Subtract */;
                    }
                }
            // `#`
            case 35 /* Hash */:
                {
                    if (state & 4 /* LineStart */ &&
                        this$1.source.charCodeAt(this$1.index + 1) === 33 /* Exclamation */) {
                        this$1.index += 2;
                        this$1.column += 2;
                        this$1.skipComments(state);
                        continue;
                    }
                }
            // `{`
            case 123 /* LeftBrace */:
                this$1.advance();
                return 393228 /* LeftBrace */;
            // `}`
            case 125 /* RightBrace */:
                this$1.advance();
                return 15 /* RightBrace */;
            // `~`
            case 126 /* Tilde */:
                this$1.advance();
                return 4456494 /* Complement */;
            // `?`
            case 63 /* QuestionMark */:
                this$1.advance();
                return 22 /* QuestionMark */;
            // `[`
            case 91 /* LeftBracket */:
                this$1.advance();
                return 393235 /* LeftBracket */;
            // `]`
            case 93 /* RightBracket */:
                this$1.advance();
                return 20 /* RightBracket */;
            // `,`
            case 44 /* Comma */:
                this$1.advance();
                return 18 /* Comma */;
            // `:`
            case 58 /* Colon */:
                this$1.advance();
                return 21 /* Colon */;
            // `;`
            case 59 /* Semicolon */:
                this$1.advance();
                return 17 /* Semicolon */;
            // `(`
            case 40 /* LeftParen */:
                this$1.advance();
                return 262155 /* LeftParen */;
            // `)`
            case 41 /* RightParen */:
                this$1.advance();
                return 16 /* RightParen */;
            // Template
            case 96 /* Backtick */:
                return this$1.scanTemplate(context, first);
            // `'string'`, `"string"`
            case 34 /* DoubleQuote */:
            case 39 /* SingleQuote */:
                return this$1.scanString(context, first);
            // `&`, `&&`, `&=`
            case 38 /* Ampersand */:
                {
                    this$1.advance();
                    var next$3 = this$1.nextChar();
                    if (next$3 === 38 /* Ampersand */) {
                        this$1.advance();
                        return 2097719 /* LogicalAnd */;
                    }
                    if (next$3 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310761 /* BitwiseAndAssign */;
                    }
                    return 2098500 /* BitwiseAnd */;
                }
            // `%`, `%=`
            case 37 /* Percent */:
                this$1.advance();
                if (!this$1.consume(61 /* EqualSign */))
                    { return 2099764 /* Modulo */; }
                return 1310758 /* ModuloAssign */;
            // `!`, `!=`, `!==`
            case 33 /* Exclamation */:
                this$1.advance();
                if (!this$1.consume(61 /* EqualSign */))
                    { return 4456493 /* Negate */; }
                if (!this$1.consume(61 /* EqualSign */))
                    { return 2098748 /* LooseNotEqual */; }
                return 2098746 /* StrictNotEqual */;
            // `^`, `^=`
            case 94 /* Caret */:
                this$1.advance();
                if (!this$1.consume(61 /* EqualSign */))
                    { return 2098246 /* BitwiseXor */; }
                return 1310759 /* BitwiseXorAssign */;
            // `*`, `**`, `*=`, `**=`
            case 42 /* Asterisk */:
                {
                    this$1.advance();
                    if (!this$1.hasNext())
                        { return 2099763 /* Multiply */; }
                    var next$4 = this$1.nextChar();
                    if (next$4 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310756 /* MultiplyAssign */;
                    }
                    if (next$4 !== 42 /* Asterisk */)
                        { return 2099763 /* Multiply */; }
                    this$1.advance();
                    if (!this$1.consume(61 /* EqualSign */))
                        { return 2100022 /* Exponentiate */; }
                    return 1310753 /* ExponentiateAssign */;
                }
            // `+`, `++`, `+=`
            case 43 /* Plus */:
                {
                    this$1.advance();
                    if (!this$1.hasNext())
                        { return 6555951 /* Add */; }
                    var next$5 = this$1.nextChar();
                    if (next$5 === 43 /* Plus */) {
                        this$1.advance();
                        return 786459 /* Increment */;
                    }
                    if (next$5 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310754 /* AddAssign */;
                    }
                    return 6555951 /* Add */;
                }
            // `=`, `==`, `===`, `=>`
            case 61 /* EqualSign */:
                {
                    this$1.advance();
                    if (!this$1.hasNext())
                        { return 1310749 /* Assign */; }
                    var next$6 = this$1.nextChar();
                    if (next$6 === 61 /* EqualSign */) {
                        this$1.advance();
                        if (this$1.consume(61 /* EqualSign */)) {
                            return 2098745 /* StrictEqual */;
                        }
                        else {
                            return 2098747 /* LooseEqual */;
                        }
                    }
                    else if (next$6 === 62 /* GreaterThan */) {
                        this$1.advance();
                        return 10 /* Arrow */;
                    }
                    return 1310749 /* Assign */;
                }
            // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
            case 62 /* GreaterThan */:
                {
                    this$1.advance();
                    // Fixes '<a>= == =</a>'
                    if (context & 8192 /* JSXChild */)
                        { return 2099008 /* GreaterThan */; }
                    var next$7 = this$1.nextChar();
                    if (next$7 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 2099006 /* GreaterThanOrEqual */;
                    }
                    if (next$7 !== 62 /* GreaterThan */)
                        { return 2099008 /* GreaterThan */; }
                    this$1.advance();
                    next$7 = this$1.nextChar();
                    if (next$7 === 62 /* GreaterThan */) {
                        this$1.advance();
                        if (this$1.consume(61 /* EqualSign */)) {
                            return 1310752 /* LogicalShiftRightAssign */;
                        }
                        else {
                            return 2099267 /* LogicalShiftRight */;
                        }
                    }
                    else if (next$7 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310751 /* ShiftRightAssign */;
                    }
                    return 2099266 /* ShiftRight */;
                }
            // `|`, `||`, `|=`
            case 124 /* VerticalBar */:
                {
                    this$1.advance();
                    var next$8 = this$1.nextChar();
                    if (next$8 === 124 /* VerticalBar */) {
                        this$1.advance();
                        return 2097464 /* LogicalOr */;
                    }
                    else if (next$8 === 61 /* EqualSign */) {
                        this$1.advance();
                        return 1310760 /* BitwiseOrAssign */;
                    }
                    return 2097989 /* BitwiseOr */;
                }
            // '.'
            case 46 /* Period */:
                {
                    var index = this$1.index + 1;
                    var next$9 = this$1.source.charCodeAt(index);
                    if (next$9 >= 48 /* Zero */ && next$9 <= 57 /* Nine */) {
                        this$1.scanNumber(context);
                        return 262146 /* NumericLiteral */;
                    }
                    else if (next$9 === 46 /* Period */) {
                        index++;
                        if (index < this$1.source.length &&
                            this$1.source.charCodeAt(index) === 46 /* Period */) {
                            this$1.index = index + 1;
                            this$1.column += 3;
                            return 14 /* Ellipsis */;
                        }
                    }
                    this$1.advance();
                    return 13 /* Period */;
                }
            // '0'
            case 48 /* Zero */:
                {
                    var index$1 = this$1.index + 1;
                    if (index$1 + 1 < this$1.source.length) {
                        switch (this$1.source.charCodeAt(index$1)) {
                            case 120 /* LowerX */:
                            case 88 /* UpperX */:
                                return this$1.scanHexadecimalDigit();
                            case 98 /* LowerB */:
                            case 66 /* UpperB */:
                                return this$1.scanBinaryDigits(context);
                            case 111 /* LowerO */:
                            case 79 /* UpperO */:
                                return this$1.scanOctalDigits(context);
                            default: // ignore
                        }
                    }
                    var nextChar = this$1.source.charCodeAt(index$1);
                    if (index$1 < this$1.source.length && nextChar >= 48 /* Zero */ && nextChar <= 55 /* Seven */) {
                        return this$1.scanNumberLiteral(context);
                    }
                }
            // '1' - '9'
            case 49 /* One */:
            case 50 /* Two */:
            case 51 /* Three */:
            case 52 /* Four */:
            case 53 /* Five */:
            case 54 /* Six */:
            case 55 /* Seven */:
            case 56 /* Eight */:
            case 57 /* Nine */:
                return this$1.scanNumber(context);
            // '\uVar', `\u{N}var`
            case 92 /* Backslash */:
            // `A`...`Z`
            case 65 /* UpperA */:
            case 66 /* UpperB */:
            case 67 /* UpperC */:
            case 68 /* UpperD */:
            case 69 /* UpperE */:
            case 70 /* UpperF */:
            case 71 /* UpperG */:
            case 72 /* UpperH */:
            case 73 /* UpperI */:
            case 74 /* UpperJ */:
            case 75 /* UpperK */:
            case 76 /* UpperL */:
            case 77 /* UpperM */:
            case 78 /* UpperN */:
            case 79 /* UpperO */:
            case 80 /* UpperP */:
            case 81 /* UpperQ */:
            case 82 /* UpperR */:
            case 83 /* UpperS */:
            case 84 /* UpperT */:
            case 85 /* UpperU */:
            case 86 /* UpperV */:
            case 87 /* UpperW */:
            case 88 /* UpperX */:
            case 89 /* UpperY */:
            case 90 /* UpperZ */:
            // '$'
            case 36 /* Dollar */:
            // '_'
            case 95 /* Underscore */:
            //  `a`...`z`
            case 97 /* LowerA */:
            case 98 /* LowerB */:
            case 99 /* LowerC */:
            case 100 /* LowerD */:
            case 101 /* LowerE */:
            case 102 /* LowerF */:
            case 103 /* LowerG */:
            case 104 /* LowerH */:
            case 105 /* LowerI */:
            case 106 /* LowerJ */:
            case 107 /* LowerK */:
            case 108 /* LowerL */:
            case 109 /* LowerM */:
            case 110 /* LowerN */:
            case 111 /* LowerO */:
            case 112 /* LowerP */:
            case 113 /* LowerQ */:
            case 114 /* LowerR */:
            case 115 /* LowerS */:
            case 116 /* LowerT */:
            case 117 /* LowerU */:
            case 118 /* LowerV */:
            case 119 /* LowerW */:
            case 120 /* LowerX */:
            case 121 /* LowerY */:
            case 122 /* LowerZ */:
                return this$1.scanIdentifierOrKeyword(context);
            default:
                if (isValidIdentifierStart(first))
                    { return this$1.scanUnicodeIdentifier(context); }
                if (first >= 0xD800 && first <= 0xDFFF) {
                    return this$1.scanSurrogate(context, first);
                }
                this$1.error(0 /* Unexpected */);
        }
    }
    return 0 /* EndOfSource */;
};
/**
 * Skips single line, shebang and multiline comments
 *
 * @param state Scanner
 */
Parser.prototype.skipComments = function skipComments (state) {
        var this$1 = this;

    var start = this.index;
    // It's only pre-closed for shebang and single line comments
    if (!(state & 8 /* MultiLine */))
        { state |= 32 /* Closed */; }
    loop: while (this.hasNext()) {
        switch (this$1.nextChar()) {
            // Line Terminators
            case 13 /* CarriageReturn */:
                this$1.flags |= 1 /* LineTerminator */;
                this$1.advanceNewline();
                state |= 4 /* LineStart */ | 2 /* LastIsCR */;
                if (!(state & 8 /* MultiLine */))
                    { break loop; }
                break;
            case 10 /* LineFeed */:
                this$1.flags |= 1 /* LineTerminator */;
                this$1.consumeLineFeed(state);
                state = state & ~2 /* LastIsCR */ | 4 /* LineStart */;
                if (!(state & 8 /* MultiLine */))
                    { break loop; }
                break;
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                state = state & ~2 /* LastIsCR */ | 4 /* LineStart */;
                this$1.flags |= 1 /* LineTerminator */;
                this$1.advanceNewline();
                break;
            case 42 /* Asterisk */:
                if (state & 8 /* MultiLine */) {
                    this$1.advance();
                    state &= ~2 /* LastIsCR */;
                    if (this$1.consume(47 /* Slash */)) {
                        state |= 32 /* Closed */;
                        break loop;
                    }
                    break;
                }
            default:
                this$1.advance();
        }
    }
    if (!(state & 32 /* Closed */))
        { this.error(2 /* UnterminatedComment */); }
    if (state & 24 /* Collectable */ && this.flags & 8388608 /* OptionsComments */) {
        var loc = {};
        var commentStart;
        var commentEnd;
        var type = state & 8 /* MultiLine */ ? 'Block' : 'Line';
        var value = this.source.slice(start, state & 8 /* MultiLine */ ? this.index - 2 : this.index);
        if (this.flags & 131072 /* OptionsLoc */) {
            loc = {
                start: {
                    line: this.startLine,
                    column: this.startColumn,
                },
                end: {
                    line: this.lastLine,
                    column: this.column
                }
            };
        }
        if (this.flags & 65536 /* OptionsRanges */) {
            commentStart = this.startIndex;
            commentEnd = this.index;
        }
        if (typeof this.comments === 'function') {
            this.comments(type, value, commentStart, commentEnd, loc);
        }
        else if (Array.isArray(this.comments)) {
            var node = {
                type: type,
                value: value,
                start: commentStart,
                end: commentEnd,
                loc: loc
            };
            if (this.flags & 16777216 /* OptionsDelegate */) {
                this.delegate(node, commentStart, commentEnd, loc);
            }
            this.comments.push(node);
        }
    }
};
Parser.prototype.scanIdentifierOrKeyword = function scanIdentifierOrKeyword (context) {
    var ret = this.scanIdentifier(context);
    if (this.flags & 2 /* HasUnicode */ && ret === 'target') {
        this.error(68 /* UnexpectedEscapedKeyword */);
    }
    var len = ret.length;
    this.tokenValue = ret;
    // Reserved words are between 2 and 11 characters long and start with a lowercase letter
    if (len >= 2 && len <= 11) {
        var token = descKeyword(ret);
        if (token > 0) {
            return token;
        }
    }
    return 262145 /* Identifier */;
};
Parser.prototype.scanSurrogate = function scanSurrogate (context, first) {
    var next = this.source.charCodeAt(this.index + 1);
    if (!isIdentifierStart(((first - 0x0d800) << 10) + (next - 0x0dc00) + 0x010000))
        { this.error(0 /* Unexpected */); }
    this.index += 2;
    this.column += 2;
    this.tokenValue = this.scanIdentifier(context, fromCodePoint(first) + fromCodePoint(next));
    return 262145 /* Identifier */;
};
Parser.prototype.scanUnicodeIdentifier = function scanUnicodeIdentifier (context) {
    var ret = this.scanIdentifier(context);
    this.tokenValue = ret;
    return 262145 /* Identifier */;
};
Parser.prototype.scanIdentifier = function scanIdentifier (context, ret) {
        var this$1 = this;
        if ( ret === void 0 ) ret = '';

    var start = this.index;
    loop: while (this.hasNext()) {
        var code = this$1.nextChar();
        switch (code) {
            case 92 /* Backslash */:
                this$1.flags |= 2 /* HasUnicode */;
                ret += this$1.source.slice(start, this$1.index);
                ret += fromCodePoint(this$1.peekUnicodeEscape());
                start = this$1.index;
                break;
            default:
                if (code >= 0xD800 && code <= 0xDFFF) {
                    code = this$1.nextUnicodeChar();
                }
                else if (!isIdentifierPart(code)) {
                    break loop;
                }
                this$1.advance();
        }
    }
    if (start < this.index)
        { ret += this.source.slice(start, this.index); }
    return ret;
};
/**
 * Peek unicode escape
 */
Parser.prototype.peekUnicodeEscape = function peekUnicodeEscape () {
    this.advance();
    var code = this.peekExtendedUnicodeEscape();
    if (code >= 0xd800 && code <= 0xdc00) {
        this.error(97 /* UnexpectedSurrogate */);
    }
    if (!isvalidIdentifierContinue(code)) {
        this.error(6 /* InvalidUnicodeEscapeSequence */);
    }
    this.advance();
    return code;
};
Parser.prototype.peekExtendedUnicodeEscape = function peekExtendedUnicodeEscape () {
        var this$1 = this;

    this.advance();
    var ch = this.nextChar();
    var code = 0;
    // '\u{DDDDDDDD}'
    if (ch === 123 /* LeftBrace */) {
        ch = this.scanNext(ch, 58 /* InvalidHexEscapeSequence */);
        // At least, one hex digit is required.
        if (ch === 125 /* RightBrace */) {
            this.error(58 /* InvalidHexEscapeSequence */);
        }
        while (ch !== 125 /* RightBrace */) {
            var digit = toHex(ch);
            if (digit < 0)
                { this$1.error(58 /* InvalidHexEscapeSequence */); }
            code = (code << 4) | digit;
            if (code > 1114111 /* LastUnicodeChar */)
                { this$1.error(5 /* UnicodeOutOfRange */); }
            // At least one digit is expected
            ch = this$1.scanNext(ch, 58 /* InvalidHexEscapeSequence */);
        }
        return code;
    }
    if (this.index + 3 > this.source.length) {
        this.error(6 /* InvalidUnicodeEscapeSequence */);
    }
    // '\uDDDD'    
    code = toHex(ch);
    if (code < 0)
        { this.error(58 /* InvalidHexEscapeSequence */); }
    for (var i = 0; i < 3; i++) {
        ch = this$1.scanNext(ch, 58 /* InvalidHexEscapeSequence */);
        var digit$1 = toHex(ch);
        if (code < 0)
            { this$1.error(58 /* InvalidHexEscapeSequence */); }
        code = code << 4 | digit$1;
    }
    return code;
};
Parser.prototype.scanNumberLiteral = function scanNumberLiteral (context) {
        var this$1 = this;

    if (context & 2 /* Strict */)
        { this.error(7 /* StrictOctalEscape */); }
    this.flags |= 4096 /* Noctal */;
    this.advance();
    var ch = this.nextChar();
    var code = 0;
    var isDecimal = false;
    while (this.hasNext()) {
        ch = this$1.nextChar();
        if (!isDecimal && ch >= 56 /* Eight */)
            { isDecimal = true; }
        if (!(48 /* Zero */ <= ch && ch <= 57 /* Nine */))
            { break; }
        code = code * 8 + (ch - 48);
        this$1.advance();
    }
    if (this.flags & 2097152 /* OptionsNext */ && this.consume(110 /* LowerN */))
        { this.flags |= 8192 /* BigInt */; }
    if (this.flags & 1048576 /* OptionsRaw */)
        { this.storeRaw(this.startIndex); }
    this.tokenValue = isDecimal ? parseInt(this.source.slice(this.startIndex, this.index), 10) : code;
    return 262146 /* NumericLiteral */;
};
Parser.prototype.scanOctalDigits = function scanOctalDigits (context) {
        var this$1 = this;

    this.index += 2;
    this.column += 2;
    var ch = this.nextChar();
    var code = ch - 48;
    // we must have at least one octal digit after 'o'/'O'
    if (ch < 48 /* Zero */ || ch >= 56 /* Eight */)
        { this.error(43 /* InvalidBinaryDigit */); }
    this.advance();
    while (this.hasNext()) {
        ch = this$1.nextChar();
        if (!(48 /* Zero */ <= ch && ch <= 55 /* Seven */))
            { break; }
        code = (code << 3) | (ch - 48 /* Zero */);
        this$1.advance();
    }
    this.tokenValue = code;
    if (this.flags & 2097152 /* OptionsNext */ && this.consume(110 /* LowerN */))
        { this.flags |= 8192 /* BigInt */; }
    if (this.flags & 1048576 /* OptionsRaw */)
        { this.storeRaw(this.startIndex); }
    return 262146 /* NumericLiteral */;
};
Parser.prototype.scanHexadecimalDigit = function scanHexadecimalDigit () {
        var this$1 = this;

    this.index += 2;
    this.column += 2;
    var ch = this.nextChar();
    var code = toHex(ch);
    if (code < 0)
        { this.error(94 /* InvalidRadix */); }
    this.advance();
    while (this.hasNext()) {
        ch = this$1.nextChar();
        var digit = toHex(ch);
        if (digit < 0)
            { break; }
        code = code << 4 | digit;
        this$1.advance();
    }
    this.tokenValue = code;
    if (this.flags & 2097152 /* OptionsNext */ && this.consume(110 /* LowerN */))
        { this.flags |= 8192 /* BigInt */; }
    if (this.flags & 1048576 /* OptionsRaw */)
        { this.storeRaw(this.startIndex); }
    return 262146 /* NumericLiteral */;
};
Parser.prototype.scanBinaryDigits = function scanBinaryDigits (context) {
        var this$1 = this;

    this.index += 2;
    this.column += 2;
    var ch = this.nextChar();
    var code = ch - 48;
    // Invalid:  '0b'
    if (ch !== 48 /* Zero */ && ch !== 49 /* One */) {
        this.error(43 /* InvalidBinaryDigit */);
    }
    this.advance();
    while (this.hasNext()) {
        ch = this$1.nextChar();
        if (!(ch === 48 /* Zero */ || ch === 49 /* One */))
            { break; }
        code = (code << 1) | (ch - 48 /* Zero */);
        this$1.advance();
    }
    this.tokenValue = code;
    if (this.flags & 2097152 /* OptionsNext */ && this.consume(110 /* LowerN */))
        { this.flags |= 8192 /* BigInt */; }
    if (this.flags & 1048576 /* OptionsRaw */)
        { this.storeRaw(this.startIndex); }
    return 262146 /* NumericLiteral */;
};
Parser.prototype.advanceAndSkipDigits = function advanceAndSkipDigits () {
    this.advance();
    this.skipDigits();
};
Parser.prototype.skipDigits = function skipDigits () {
        var this$1 = this;

    scan: while (this.hasNext()) {
        switch (this$1.nextChar()) {
            case 48 /* Zero */:
            case 49 /* One */:
            case 50 /* Two */:
            case 51 /* Three */:
            case 52 /* Four */:
            case 53 /* Five */:
            case 54 /* Six */:
            case 55 /* Seven */:
            case 56 /* Eight */:
            case 57 /* Nine */:
                this$1.advance();
                break;
            default:
                break scan;
        }
    }
};
Parser.prototype.scanNumber = function scanNumber (context) {
    var start = this.index;
    var state = 0;
    this.skipDigits();
    if (this.nextChar() === 46 /* Period */) {
        state |= 2 /* Float */;
        this.advanceAndSkipDigits();
    }
    var end = this.index;
    var cp = this.nextChar();
    switch (cp) {
        // scan exponent, if any
        case 69 /* UpperE */:
        case 101 /* LowerE */:
            this.advance();
            state |= 4 /* Exponent */;
            // scan exponent
            switch (this.nextChar()) {
                case 43 /* Plus */:
                case 45 /* Hyphen */:
                    this.advance();
                    if (!this.hasNext())
                        { this.error(95 /* UnexpectedTokenNumber */); }
                default: // ignore
            }
            cp = this.nextChar();
            // we must have at least one decimal digit after 'e'/'E'
            if (!(cp >= 48 /* Zero */ && cp <= 57 /* Nine */))
                { this.error(96 /* UnexpectedMantissa */); }
            this.advanceAndSkipDigits();
            end = this.index;
            break;
        // BigInt - Stage 3 proposal
        case 110 /* LowerN */:
            if (this.flags & 2097152 /* OptionsNext */) {
                if (state & 2 /* Float */)
                    { this.error(0 /* Unexpected */); }
                this.advance();
                state |= 8 /* BigInt */;
                end = this.index;
            }
        default: // ignore
    }
    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
    // The SourceCharacter immediately following a NumericLiteral must not be an IdentifierStart or DecimalDigit.
    // For example : 3in is an error and not the two input elements 3 and in
    if (isIdentifierStart(this.nextChar()))
        { this.error(95 /* UnexpectedTokenNumber */); }
    var raw = this.source.substring(start, end);
    if (this.flags & 1048576 /* OptionsRaw */)
        { this.tokenRaw = raw; }
    if (state & 8 /* BigInt */)
        { this.flags |= 8192 /* BigInt */; }
    this.tokenValue = state & 6 /* FloatOrExponent */ ? parseFloat(raw) : parseInt(raw, 10);
    return 262146 /* NumericLiteral */;
};
Parser.prototype.scanRegularExpression = function scanRegularExpression () {
        var this$1 = this;

    var bodyStart = this.startIndex + 1;
    var preparseState = 0;
    loop: while (true) {
        var ch = this$1.nextChar();
        this$1.advance();
        if (preparseState & 1 /* Escape */) {
            preparseState &= ~1 /* Escape */;
        }
        else {
            switch (ch) {
                case 47 /* Slash */:
                    if (!preparseState)
                        { break loop; }
                    break;
                case 92 /* Backslash */:
                    preparseState |= 1 /* Escape */;
                    break;
                case 91 /* LeftBracket */:
                    preparseState |= 2 /* Class */;
                    break;
                case 93 /* RightBracket */:
                    preparseState &= 1 /* Escape */;
                    break;
                case 13 /* CarriageReturn */:
                case 10 /* LineFeed */:
                case 8232 /* LineSeparator */:
                case 8233 /* ParagraphSeparator */:
                    return this$1.token;
                default: // ignore
            }
        }
        if (!this$1.hasNext())
            { this$1.error(4 /* UnterminatedRegExp */); }
    }
    var bodyEnd = this.index - 1; // drop the slash from the slice
    var flagsStart = this.index;
    var mask = 0;
    loop: while (this.hasNext()) {
        var code = this$1.nextChar();
        switch (code) {
            case 103 /* LowerG */:
                if (mask & 1 /* Global */)
                    { this$1.error(11 /* DuplicateRegExpFlag */, 'g'); }
                mask |= 1 /* Global */;
                break;
            case 105 /* LowerI */:
                if (mask & 16 /* IgnoreCase */)
                    { this$1.error(11 /* DuplicateRegExpFlag */, 'i'); }
                mask |= 16 /* IgnoreCase */;
                break;
            case 109 /* LowerM */:
                if (mask & 8 /* Multiline */)
                    { this$1.error(11 /* DuplicateRegExpFlag */, 'm'); }
                mask |= 8 /* Multiline */;
                break;
            case 117 /* LowerU */:
                if (mask & 2 /* Unicode */)
                    { this$1.error(11 /* DuplicateRegExpFlag */, 'u'); }
                mask |= 2 /* Unicode */;
                break;
            case 121 /* LowerY */:
                if (mask & 4 /* Sticky */)
                    { this$1.error(11 /* DuplicateRegExpFlag */, 'y'); }
                mask |= 4 /* Sticky */;
                break;
            // Stage 3 proposal
            case 115 /* LowerS */:
                if (this$1.flags & 2097152 /* OptionsNext */) {
                    if (mask & 32 /* DotAll */)
                        { this$1.error(11 /* DuplicateRegExpFlag */, 's'); }
                    mask |= 32 /* DotAll */;
                    break;
                }
            default:
                if (!isIdentifierPart(code))
                    { break loop; }
                this$1.error(13 /* UnexpectedTokenRegExpFlag */);
        }
        this$1.advance();
    }
    var flagsEnd = this.index;
    var pattern = this.source.slice(bodyStart, bodyEnd);
    var flags = this.source.slice(flagsStart, flagsEnd);
    this.tokenRegExp = {
        pattern: pattern,
        flags: flags
    };
    this.tokenValue = tryCreate(pattern, flags);
    if (this.flags & 1048576 /* OptionsRaw */)
        { this.storeRaw(this.startIndex); }
    return 262148 /* RegularExpression */;
};
Parser.prototype.scanString = function scanString (context, quote) {
        var this$1 = this;

    var start = this.index;
    var lastChar = this.lastChar;
    var ret = '';
    var ch = this.scanNext(quote);
    while (ch !== quote) {
        switch (ch) {
            case 13 /* CarriageReturn */:
            case 10 /* LineFeed */:
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                this$1.error(3 /* UnterminatedString */);
            case 92 /* Backslash */:
                ch = this$1.scanNext(ch);
                if (ch >= 128) {
                    ret += fromCodePoint(ch);
                }
                else {
                    this$1.lastChar = ch;
                    var code = this$1.scanEscape(context, ch);
                    if (code >= 0) {
                        ret += fromCodePoint(code);
                    }
                    else {
                        this$1.handleStringError(code);
                    }
                    this$1.flags |= 2 /* HasUnicode */;
                    ch = this$1.lastChar;
                }
                break;
            default:
                ret += fromCodePoint(ch);
        }
        ch = this$1.scanNext(ch);
    }
    this.advance(); // Consume the quote
    if (this.flags & 1048576 /* OptionsRaw */)
        { this.storeRaw(start); }
    this.tokenValue = ret;
    this.lastChar = lastChar;
    return 262147 /* StringLiteral */;
};
Parser.prototype.handleStringError = function handleStringError (code) {
    switch (code) {
        case -1 /* Empty */:
            return;
        case -2 /* StrictOctal */:
            this.error(7 /* StrictOctalEscape */);
        case -6 /* TemplateOctalLiteral */:
            this.error(107 /* TemplateOctalLiteral */);
        case -3 /* EightOrNine */:
            this.error(8 /* InvalidEightAndNine */);
        case -4 /* InvalidHex */:
            this.error(58 /* InvalidHexEscapeSequence */);
        case -5 /* OutOfRange */:
            this.error(5 /* UnicodeOutOfRange */);
        default:
            this.error(106 /* BadUntaggedTemplate */);
    }
};
Parser.prototype.scanEscape = function scanEscape (context, cp, isTemplate) {
        var this$1 = this;
        if ( isTemplate === void 0 ) isTemplate = false;

    switch (cp) {
        case 98 /* LowerB */:
            return 8 /* Backspace */;
        case 102 /* LowerF */:
            return 12 /* FormFeed */;
        case 114 /* LowerR */:
            return 13 /* CarriageReturn */;
        case 110 /* LowerN */:
            return 10 /* LineFeed */;
        case 116 /* LowerT */:
            return 9 /* Tab */;
        case 118 /* LowerV */:
            return 11 /* VerticalTab */;
        case 13 /* CarriageReturn */:
            {
                var index = this.index;
                if (index < this.source.length) {
                    var ch = this.source.charCodeAt(index);
                    if (ch === 10 /* LineFeed */) {
                        this.lastChar = ch;
                        this.index = index + 1;
                    }
                }
            }
        // falls through
        case 10 /* LineFeed */:
        case 8232 /* LineSeparator */:
        case 8233 /* ParagraphSeparator */:
            this.column = -1;
            this.line++;
            return -1 /* Empty */;
        // Null character, octals
        case 48 /* Zero */:
        case 49 /* One */:
        case 50 /* Two */:
        case 51 /* Three */:
            {
                var code = cp - 48;
                var index$1 = this.index + 1;
                var column = this.column + 1;
                if (isTemplate && !(context & 1048576 /* TaggedTemplate */))
                    { return -6 /* TemplateOctalLiteral */; }
                if (index$1 < this.source.length) {
                    var next = this.source.charCodeAt(index$1);
                    if (next < 48 /* Zero */ || next > 55 /* Seven */) {
                        if (code !== 0 && context & 2 /* Strict */)
                            { return -2 /* StrictOctal */; }
                    }
                    else if (context & 2 /* Strict */) {
                        return -2 /* StrictOctal */;
                    }
                    else {
                        this.lastChar = next;
                        code = (code << 3) | (next - 48 /* Zero */);
                        index$1++;
                        column++;
                        if (index$1 < this.source.length) {
                            next = this.source.charCodeAt(index$1);
                            if (next >= 48 /* Zero */ && next <= 55 /* Seven */) {
                                this.lastChar = next;
                                code = (code << 3) | (next - 48 /* Zero */);
                                index$1++;
                                column++;
                            }
                        }
                        this.index = index$1 - 1;
                        this.column = column - 1;
                    }
                }
                return code;
            }
        case 52 /* Four */:
        case 53 /* Five */:
        case 54 /* Six */:
        case 55 /* Seven */:
            {
                if (isTemplate && !(context & 1048576 /* TaggedTemplate */)) {
                    return -6 /* TemplateOctalLiteral */;
                }
                if (context & 2 /* Strict */) {
                    return -2 /* StrictOctal */;
                }
                var code$1 = cp - 48;
                var index$2 = this.index + 1;
                var column$1 = this.column + 1;
                if (index$2 < this.source.length) {
                    var next$1 = this.source.charCodeAt(index$2);
                    if (next$1 >= 48 /* Zero */ && next$1 <= 55 /* Seven */) {
                        code$1 = (code$1 << 3) | (next$1 - 48 /* Zero */);
                        this.lastChar = next$1;
                        this.index = index$2;
                        this.column = column$1;
                    }
                }
                return code$1;
            }
        // `8`, `9` (invalid escapes)
        case 56 /* Eight */:
        case 57 /* Nine */:
            return -3 /* EightOrNine */;
        // ASCII escapes
        case 120 /* LowerX */:
            {
                var ch1 = this.lastChar = this.scanNext(cp);
                var hi = toHex(ch1);
                if (hi < 0)
                    { return -4 /* InvalidHex */; }
                var ch2 = this.lastChar = this.scanNext(ch1);
                var lo = toHex(ch2);
                if (lo < 0)
                    { return -4 /* InvalidHex */; }
                return hi << 4 | lo;
            }
        // UCS-2/Unicode escapes
        case 117 /* LowerU */:
            {
                var ch$1 = this.lastChar = this.scanNext(cp);
                if (ch$1 === 123 /* LeftBrace */) {
                    // \u{N}
                    ch$1 = this.lastChar = this.scanNext(ch$1);
                    var code$2 = toHex(ch$1);
                    if (code$2 < 0)
                        { return -4 /* InvalidHex */; }
                    ch$1 = this.lastChar = this.scanNext(ch$1);
                    while (ch$1 !== 125 /* RightBrace */) {
                        var digit = toHex(ch$1);
                        if (digit < 0)
                            { return -4 /* InvalidHex */; }
                        code$2 = code$2 << 4 | digit;
                        if (code$2 > 1114111 /* LastUnicodeChar */)
                            { return -5 /* OutOfRange */; }
                        ch$1 = this$1.lastChar = this$1.scanNext(ch$1);
                    }
                    return code$2;
                }
                else {
                    // \uNNNN
                    var code$3 = toHex(ch$1);
                    if (code$3 < 0)
                        { return -4 /* InvalidHex */; }
                    for (var i = 0; i < 3; i++) {
                        ch$1 = this$1.lastChar = this$1.scanNext(ch$1);
                        var digit$1 = toHex(ch$1);
                        if (digit$1 < 0)
                            { return -4 /* InvalidHex */; }
                        code$3 = code$3 << 4 | digit$1;
                    }
                    return code$3;
                }
            }
        default:
            return this.nextUnicodeChar();
    }
};
Parser.prototype.scanTemplateNext = function scanTemplateNext (context) {
    if (!this.hasNext())
        { this.error(0 /* Unexpected */); }
    this.index--;
    this.column--;
    return this.scanTemplate(context, 125 /* RightBrace */);
};
Parser.prototype.scanTemplate = function scanTemplate (context, first) {
        var this$1 = this;

    var start = this.index;
    var lastChar = this.lastChar;
    var tail = true;
    var ret = '';
    var ch = this.scanNext(first, 79 /* UnterminatedTemplate */);
    loop: while (ch !== 96 /* Backtick */) {
        switch (ch) {
            // '$'
            case 36 /* Dollar */:
                {
                    var index = this$1.index + 1;
                    if (index < this$1.source.length &&
                        this$1.source.charCodeAt(index) === 123 /* LeftBrace */) {
                        this$1.index = index;
                        this$1.column++;
                        tail = false;
                        break loop;
                    }
                    ret += '$';
                    break;
                }
            // '/'
            case 92 /* Backslash */:
                ch = this$1.scanNext(ch, 79 /* UnterminatedTemplate */);
                if (ch >= 128) {
                    ret += fromCodePoint(ch);
                }
                else {
                    this$1.lastChar = ch;
                    var code = this$1.scanEscape(context, ch, true);
                    if (code >= 0) {
                        ret += fromCodePoint(code);
                    }
                    else if (code !== -1 /* Empty */ && context & 1048576 /* TaggedTemplate */) {
                        ret = null;
                        ch = this$1.scanLooserTemplateSegment(this$1.lastChar);
                        if (ch < 0) {
                            ch = -ch;
                            tail = false;
                        }
                        break loop;
                    }
                    else {
                        this$1.handleStringError(code);
                    }
                    ch = this$1.lastChar;
                }
                break;
            // Line terminators
            case 13 /* CarriageReturn */:
                if (this$1.hasNext() && this$1.nextChar() === 10 /* LineFeed */) {
                    if (ret != null)
                        { ret += fromCodePoint(ch); }
                    ch = this$1.nextChar();
                    this$1.index++;
                }
            case 10 /* LineFeed */:
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                this$1.column = -1;
                this$1.line++;
            default:
                if (ret != null)
                    { ret += fromCodePoint(ch); }
        }
        ch = this$1.scanNext(ch, 79 /* UnterminatedTemplate */);
    }
    this.advance();
    if (ch & 0x10000)
        { this.index++; }
    this.tokenValue = ret;
    this.lastChar = lastChar;
    if (tail) {
        this.tokenRaw = this.source.slice(start + 1, this.index - 1);
        return 262153 /* TemplateTail */;
    }
    else {
        this.tokenRaw = this.source.slice(start + 1, this.index - 2);
        return 262152 /* TemplateCont */;
    }
};
Parser.prototype.scanLooserTemplateSegment = function scanLooserTemplateSegment (ch) {
        var this$1 = this;

    while (ch !== 96 /* Backtick */) {
        switch (ch) {
            // '$'
            case 36 /* Dollar */:
                {
                    var index = this$1.index + 1;
                    if (index < this$1.source.length &&
                        this$1.source.charCodeAt(index) === 123 /* LeftBrace */) {
                        this$1.index = index;
                        this$1.column++;
                        return -ch;
                    }
                    break;
                }
            // '/'
            case 92 /* Backslash */:
                ch = this$1.scanNext(ch);
                break;
            // LineTerminators
            case 13 /* CarriageReturn */:
                if (this$1.hasNext() && this$1.nextChar() === 10 /* LineFeed */) {
                    ch = this$1.nextChar();
                    this$1.index++;
                }
            // falls through
            case 10 /* LineFeed */:
            case 8232 /* LineSeparator */:
            case 8233 /* ParagraphSeparator */:
                this$1.column = -1;
                this$1.line++;
            // falls through
            default:
        }
        ch = this$1.scanNext(ch);
    }
    return ch;
};
Parser.prototype.scanJSXIdentifier = function scanJSXIdentifier (context) {
        var this$1 = this;

    switch (this.token) {
        case 262145 /* Identifier */:
            var firstCharPosition = this.index;
            scan: while (this.hasNext()) {
                var ch = this$1.nextChar();
                switch (ch) {
                    case 45 /* Hyphen */:
                        this$1.advance();
                        break;
                    default:
                        break scan;
                }
            }
            this.tokenValue += this.source.slice(firstCharPosition, this.index - firstCharPosition);
        default:
            return this.token;
    }
};
Parser.prototype.parseModuleItemList = function parseModuleItemList (context) {
        var this$1 = this;

    // ecma262/#prod-Module
    // Module :
    //ModuleBody?
    //
    // ecma262/#prod-ModuleItemList
    // ModuleBody :
    //   ModuleItem*
    var statements = [];
    while (this.token !== 0 /* EndOfSource */) {
        if (this$1.token !== 262147 /* StringLiteral */)
            { break; }
        var item = this$1.parseDirective(context);
        statements.push(item);
    }
    while (this.token !== 0 /* EndOfSource */) {
        statements.push(this$1.parseModuleItem(context));
    }
    return statements;
};
Parser.prototype.parseDirective = function parseDirective (context) {
    var pos = this.getLocations();
    if (this.flags & 4194304 /* OptionsDirectives */) {
        var expr = this.parseExpression(context, pos);
        var directive = this.tokenRaw.slice(1, -1);
        this.consumeSemicolon(context);
        var node = this.finishNode(pos, {
            type: 'ExpressionStatement',
            expression: expr,
            directive: directive
        });
        return node;
    }
    return context & 1 /* Module */ ? this.parseModuleItem(context) : this.parseStatementListItem(context);
};
Parser.prototype.parseStatementList = function parseStatementList (context, endToken) {
        var this$1 = this;

    var statements = [];
    while (this.token !== endToken) {
        if (this$1.token !== 262147 /* StringLiteral */)
            { break; }
        var item = this$1.parseDirective(context);
        statements.push(item);
        if (!isPrologueDirective(item))
            { break; }
        if (this$1.flags & 2048 /* HasStrictDirective */) {
            if (this$1.flags & 16384 /* SimpleParameterList */)
                { this$1.error(26 /* IllegalUseStrict */); }
            if (this$1.flags & 1024 /* BindingPosition */)
                { this$1.error(80 /* UnexpectedStrictReserved */); }
            context |= 2 /* Strict */;
        }
    }
    while (this.token !== endToken) {
        statements.push(this$1.parseStatementListItem(context));
    }
    return statements;
};
Parser.prototype.getLocations = function getLocations () {
    return {
        index: this.index,
        start: this.startIndex,
        line: this.startLine,
        column: this.startColumn
    };
};
Parser.prototype.finishNode = function finishNode (loc, node) {
    if (this.flags & 65536 /* OptionsRanges */) {
        node.start = loc.start;
        node.end = this.lastIndex;
    }
    if (this.flags & 131072 /* OptionsLoc */) {
        node.loc = {
            start: {
                line: loc.line,
                column: loc.column,
            },
            end: {
                line: this.lastLine,
                column: this.lastColumn
            }
        };
        if (this.flags & 262144 /* OptionsSource */) {
            node.loc.source = this.locSource;
        }
    }
    if (this.flags & 16777216 /* OptionsDelegate */) {
        var metadata = {
            start: {
                line: loc.line,
                column: loc.column,
                offset: loc.index
            },
            end: {
                line: this.lastLine,
                column: this.lastColumn,
                offset: this.lastIndex
            }
        };
        this.delegate(node, loc.start, this.lastIndex, metadata);
    }
    return node;
};
Parser.prototype.parseOptional = function parseOptional (context, t) {
    if (this.token !== t)
        { return false; }
    this.nextToken(context);
    return true;
};
Parser.prototype.expect = function expect (context, t) {
    if (this.token !== t)
        { this.error(1 /* UnexpectedToken */, tokenDesc(t)); }
    this.nextToken(context);
};
Parser.prototype.isEvalOrArguments = function isEvalOrArguments (value) {
    return value === 'eval' || value === 'arguments';
};
Parser.prototype.isEvalOrArgumentsIdentifier = function isEvalOrArgumentsIdentifier (context, value) {
    if (!(context & 2 /* Strict */))
        { return false; }
    return this.isEvalOrArguments(value);
};
Parser.prototype.canConsumeSemicolon = function canConsumeSemicolon () {
    // Bail out quickly if we have seen a LineTerminator
    if (this.flags & 1 /* LineTerminator */)
        { return true; }
    switch (this.token) {
        case 17 /* Semicolon */:
        case 15 /* RightBrace */:
        case 0 /* EndOfSource */:
            return true;
        default:
            return false;
    }
};
/**
 * Consume a semicolon between tokens, optionally inserting it if necessary.
 */
Parser.prototype.consumeSemicolon = function consumeSemicolon (context) {
    if (!this.canConsumeSemicolon())
        { this.throwUnexpectedToken(); }
    if (this.token === 17 /* Semicolon */)
        { this.expect(context, 17 /* Semicolon */); }
};
Parser.prototype.nextTokenIsAssign = function nextTokenIsAssign (context) {
    var savedState = this.saveState();
    this.nextToken(context);
    var next = this.token;
    this.rewindState(savedState);
    return next === 1310749 /* Assign */;
};
// 'import', 'import.meta'
Parser.prototype.nextTokenIsLeftParenOrPeriod = function nextTokenIsLeftParenOrPeriod (context) {
    var savedState = this.saveState();
    this.nextToken(context);
    var next = this.token;
    this.rewindState(savedState);
    return next === 262155 /* LeftParen */ || next === 13 /* Period */;
};
Parser.prototype.isLexical = function isLexical (context) {
    // In ES6 'let' always starts a lexical declaration if followed by an identifier or {
    // or [.
    var savedState = this.saveState();
    this.nextToken(context);
    var next = this.token;
    this.rewindState(savedState);
    if (next === 262145 /* Identifier */)
        { return true; }
    // Fast path for '{}' / '[];
    if (hasMask(next, 131072 /* BindingPattern */))
        { return true; }
    switch (next) {
        case 393228 /* LeftBrace */:
        case 262145 /* Identifier */:
        case 393235 /* LeftBracket */:
        case 282730 /* YieldKeyword */:
            return true;
        default:
            return hasMask(next, 69632 /* Contextual */);
    }
};
Parser.prototype.isIdentifier = function isIdentifier (context, t) {
    if (context & 2 /* Strict */) {
        if (context & 1 /* Module */) {
            if ((t & 20480 /* FutureReserved */) === 20480 /* FutureReserved */)
                { this.error(80 /* UnexpectedStrictReserved */); }
        }
        return t === 262145 /* Identifier */ || (t & 69632 /* Contextual */) === 69632 /* Contextual */;
    }
    return t === 262145 /* Identifier */ || (t & 69632 /* Contextual */) === 69632 /* Contextual */ || (t & 20480 /* FutureReserved */) === 20480 /* FutureReserved */;
};
Parser.prototype.isIdentifierOrKeyword = function isIdentifierOrKeyword (t) {
    return t === 262145 /* Identifier */ || hasMask(t, 4096 /* Keyword */);
};
Parser.prototype.parseIdentifierName = function parseIdentifierName (context, t) {
    if (!this.isIdentifierOrKeyword(t))
        { this.throwUnexpectedToken(); }
    return this.parseIdentifier(context);
};
Parser.prototype.nextTokenIsFuncKeywordOnSameLine = function nextTokenIsFuncKeywordOnSameLine (context) {
    var savedState = this.saveState();
    this.nextToken(context);
    var next = this.token;
    var line = this.line;
    this.rewindState(savedState);
    return line === this.line && next === 274519 /* FunctionKeyword */;
};
Parser.prototype.parseExportDefault = function parseExportDefault (context, pos) {
    // Note:  The `default` contextual keyword must not contain Unicode escape sequences.
    if (this.flags & 2 /* HasUnicode */)
        { this.error(68 /* UnexpectedEscapedKeyword */); }
    this.expect(context, 12368 /* DefaultKeyword */);
    var declaration;
    switch (this.token) {
        // export default HoistableDeclaration[Default]
        case 274519 /* FunctionKeyword */:
            declaration = this.parseFunctionDeclaration(context | (32768 /* OptionalIdentifier */ | 1024 /* TopLevel */));
            break;
        // export default ClassDeclaration[Default]
        case 274509 /* ClassKeyword */:
            declaration = this.parseClassDeclaration(context | (32768 /* OptionalIdentifier */ | 1024 /* TopLevel */));
            break;
        // export default HoistableDeclaration[Default]
        case 69740 /* AsyncKeyword */:
            if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                declaration = this.parseFunctionDeclaration(context | (32768 /* OptionalIdentifier */ | 1024 /* TopLevel */));
                break;
            }
        // falls through
        default:
            // export default [lookahead ∉ {function, class}] AssignmentExpression[In] ;
            declaration = this.parseAssignmentExpression(context);
            this.consumeSemicolon(context);
    }
    return this.finishNode(pos, {
        type: 'ExportDefaultDeclaration',
        declaration: declaration
    });
};
Parser.prototype.parseExportDeclaration = function parseExportDeclaration (context) {
        var this$1 = this;

    // ExportDeclaration:
    //'export' '*' 'from' ModuleSpecifier ';'
    //'export' ExportClause ('from' ModuleSpecifier)? ';'
    //'export' VariableStatement
    //'export' Declaration
    //'export' 'default' ... (handled in ParseExportDefault)
    var pos = this.getLocations();
    var specifiers = [];
    var source = null;
    var isExportedReservedWord = false;
    var declaration = null;
    this.expect(context, 12371 /* ExportKeyword */);
    switch (this.token) {
        case 12368 /* DefaultKeyword */:
            return this.parseExportDefault(context, pos);
        // export * FromClause ;
        case 2099763 /* Multiply */:
            return this.parseExportAllDeclaration(context, pos);
        case 393228 /* LeftBrace */:
            // There are two cases here:
            //
            // 'export' ExportClause ';'
            // and
            // 'export' ExportClause FromClause ';'
            //
            this.expect(context, 393228 /* LeftBrace */);
            while (this.token !== 15 /* RightBrace */) {
                if (hasMask(this$1.token, 12288 /* Reserved */))
                    { isExportedReservedWord = true; }
                specifiers.push(this$1.parseExportSpecifier(context));
                // Invalid: 'export {a,,b}'
                if (this$1.token !== 15 /* RightBrace */)
                    { this$1.expect(context, 18 /* Comma */); }
            }
            this.expect(context, 15 /* RightBrace */);
            if (this.token === 69745 /* FromKeyword */) {
                // Note:  The `from` contextual keyword must not contain Unicode escape sequences.
                if (this.flags & 2 /* HasUnicode */)
                    { this.error(68 /* UnexpectedEscapedKeyword */); }
                this.expect(context, 69745 /* FromKeyword */);
                // export {default} from 'foo';
                // export {foo} from 'foo';
                source = this.parseModuleSpecifier(context);
            }
            else if (isExportedReservedWord) {
                this.throwUnexpectedToken();
            }
            this.consumeSemicolon(context);
            break;
        // export ClassDeclaration
        case 274509 /* ClassKeyword */:
            declaration = this.parseClassDeclaration(context | 1024 /* TopLevel */);
            break;
        // export LexicalDeclaration
        case 8663113 /* ConstKeyword */:
            declaration = this.parseVariableStatement(context | 8388608 /* Const */);
            break;
        // export LexicalDeclaration
        case 8671304 /* LetKeyword */:
            declaration = this.parseVariableStatement(context | 4194304 /* Let */);
            break;
        // export VariableDeclaration
        case 8663111 /* VarKeyword */:
            declaration = this.parseVariableStatement(context | 1024 /* TopLevel */);
            break;
        // export HoistableDeclaration
        case 274519 /* FunctionKeyword */:
            declaration = this.parseFunctionDeclaration(context | 1024 /* TopLevel */);
            break;
        // export HoistableDeclaration
        case 69740 /* AsyncKeyword */:
            if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                declaration = this.parseFunctionDeclaration(context | 1024 /* TopLevel */);
                break;
            }
        // Falls through
        default:
            this.error(51 /* MissingMsgDeclarationAfterExport */);
    }
    return this.finishNode(pos, {
        type: 'ExportNamedDeclaration',
        source: source,
        specifiers: specifiers,
        declaration: declaration
    });
};
Parser.prototype.parseExportSpecifier = function parseExportSpecifier (context) {
    var pos = this.getLocations();
    var local = this.parseIdentifierName(context, this.token);
    var exported = local;
    if (this.token === 69739 /* AsKeyword */) {
        // Note:  The `as` contextual keyword must not contain Unicode escape sequences.
        if (this.flags & 2 /* HasUnicode */)
            { this.error(68 /* UnexpectedEscapedKeyword */); }
        this.expect(context, 69739 /* AsKeyword */);
        exported = this.parseIdentifierName(context, this.token);
    }
    return this.finishNode(pos, {
        type: 'ExportSpecifier',
        local: local,
        exported: exported
    });
};
Parser.prototype.parseExportAllDeclaration = function parseExportAllDeclaration (context, pos) {
    this.expect(context, 2099763 /* Multiply */);
    this.expect(context, 69745 /* FromKeyword */);
    var source = this.parseModuleSpecifier(context);
    this.consumeSemicolon(context);
    return this.finishNode(pos, {
        type: 'ExportAllDeclaration',
        source: source
    });
};
Parser.prototype.parseModuleSpecifier = function parseModuleSpecifier (context) {
    // ModuleSpecifier :
    //StringLiteral
    if (this.token !== 262147 /* StringLiteral */)
        { this.error(39 /* InvalidModuleSpecifier */); }
    return this.parseLiteral(context);
};
// import {<foo as bar>} ...;
Parser.prototype.parseImportSpecifier = function parseImportSpecifier (context) {
    var pos = this.getLocations();
    var imported;
    var local;
    if (this.token === 262145 /* Identifier */ || hasMask(this.token, 131072 /* BindingPattern */)) {
        imported = this.parseIdentifier(context);
        local = imported;
        // In the presence of 'as', the left-side of the 'as' can
        // be any IdentifierName. But without 'as', it must be a valid
        // BindingIdentifier.
        if (this.token === 69739 /* AsKeyword */) {
            // Note:  The `as` contextual keyword must not contain Unicode escape sequences.
            if (this.flags & 2 /* HasUnicode */)
                { this.error(68 /* UnexpectedEscapedKeyword */); }
            this.expect(context, 69739 /* AsKeyword */);
            local = this.parseBindingPatternOrIdentifier(context, pos);
        }
    }
    else {
        imported = this.parseIdentifier(context);
        local = imported;
        // Note:  The `default` contextual keyword must not contain Unicode escape sequences.
        if (this.flags & 2 /* HasUnicode */)
            { this.error(68 /* UnexpectedEscapedKeyword */); }
        this.expect(context, 69739 /* AsKeyword */);
        local = this.parseBindingPatternOrIdentifier(context, pos);
    }
    return this.finishNode(pos, {
        type: 'ImportSpecifier',
        local: local,
        imported: imported
    });
};
// {foo, bar as bas}
Parser.prototype.parseNamedImports = function parseNamedImports (context, specifiers) {
        var this$1 = this;

    //  NamedImports
    //  ImportedDefaultBinding, NameSpaceImport
    //  ImportedDefaultBinding, NamedImports
    this.expect(context, 393228 /* LeftBrace */);
    while (!this.parseOptional(context, 15 /* RightBrace */)) {
        // only accepts identifiers or keywords
        specifiers.push(this$1.parseImportSpecifier(context));
        this$1.parseOptional(context, 18 /* Comma */);
    }
};
// import <* as foo> ...;
Parser.prototype.parseImportNamespaceSpecifier = function parseImportNamespaceSpecifier (context) {
    var pos = this.getLocations();
    this.expect(context, 2099763 /* Multiply */);
    if (this.token !== 69739 /* AsKeyword */)
        { this.error(38 /* NoAsAfterImportNamespace */); }
    // Note:  The `default` contextual keyword must not contain Unicode escape sequences.
    if (this.flags & 2 /* HasUnicode */)
        { this.error(68 /* UnexpectedEscapedKeyword */); }
    this.expect(context, 69739 /* AsKeyword */);
    if (this.token !== 262145 /* Identifier */) {
        this.throwUnexpectedToken();
    }
    var local = this.parseIdentifierName(context, this.token);
    return this.finishNode(pos, {
        type: 'ImportNamespaceSpecifier',
        local: local
    });
};
// import <foo> ...;
Parser.prototype.parseImportDefaultSpecifier = function parseImportDefaultSpecifier (context) {
    return this.finishNode(this.getLocations(), {
        type: 'ImportDefaultSpecifier',
        local: this.parseIdentifierName(context, this.token)
    });
};
Parser.prototype.parseImportDeclaration = function parseImportDeclaration (context) {
    // ImportDeclaration :
    //   'import' ImportClause 'from' ModuleSpecifier ';'
    //   'import' ModuleSpecifier ';'
    //
    // ImportClause :
    //   ImportedDefaultBinding
    //   NameSpaceImport
    //   NamedImports
    //   ImportedDefaultBinding ',' NameSpaceImport
    //   ImportedDefaultBinding ',' NamedImports
    //
    // NameSpaceImport :
    //   '*' 'as' ImportedBinding
    var pos = this.getLocations();
    var specifiers = [];
    this.expect(context, 274521 /* ImportKeyword */);
    switch (this.token) {
        // import 'foo';
        case 262147 /* StringLiteral */:
            {
                var source = this.parseModuleSpecifier(context);
                this.consumeSemicolon(context);
                return this.finishNode(pos, {
                    type: 'ImportDeclaration',
                    specifiers: specifiers,
                    source: source
                });
            }
        case 262145 /* Identifier */:
            {
                specifiers.push(this.parseImportDefaultSpecifier(context));
                if (this.parseOptional(context, 18 /* Comma */)) {
                    switch (this.token) {
                        case 2099763 /* Multiply */:
                            // import foo, * as foo
                            specifiers.push(this.parseImportNamespaceSpecifier(context));
                            break;
                        case 393228 /* LeftBrace */:
                            // import foo, {bar}
                            this.parseNamedImports(context, specifiers);
                            break;
                        default:
                            this.throwUnexpectedToken();
                    }
                }
                break;
            }
        // import {bar}
        case 393228 /* LeftBrace */:
            this.parseNamedImports(context, specifiers);
            break;
        // import * as foo
        case 2099763 /* Multiply */:
            specifiers.push(this.parseImportNamespaceSpecifier(context));
            break;
        default:
            this.throwUnexpectedToken();
    }
    this.expect(context, 69745 /* FromKeyword */);
    var src = this.parseModuleSpecifier(context);
    this.consumeSemicolon(context);
    return this.finishNode(pos, {
        type: 'ImportDeclaration',
        specifiers: specifiers,
        source: src
    });
};
Parser.prototype.parseModuleItem = function parseModuleItem (context) {
    // ecma262/#prod-ModuleItem
    // ModuleItem :
    //ImportDeclaration
    //ExportDeclaration
    //StatementListItem
    switch (this.token) {
        // 'export'
        case 12371 /* ExportKeyword */:
            return this.parseExportDeclaration(context);
        // 'import'
        case 274521 /* ImportKeyword */:
            if (!(this.flags & 2097152 /* OptionsNext */ && this.nextTokenIsLeftParenOrPeriod(context))) {
                return this.parseImportDeclaration(context);
            }
        default:
            return this.parseStatementListItem(context);
    }
};
Parser.prototype.parseStatementListItem = function parseStatementListItem (context) {
    switch (this.token) {
        case 274519 /* FunctionKeyword */:
            return this.parseFunctionDeclaration(context);
        case 274509 /* ClassKeyword */:
            return this.parseClassDeclaration(context);
        case 8671304 /* LetKeyword */:
            // If let follows identifier on the same line, it is an declaration. Parse it as a variable statement
            if (this.isLexical(context))
                { return this.parseVariableStatement(context |= 4194304 /* Let */); }
            return this.parseStatement(context & ~1024 /* TopLevel */);
        case 8663113 /* ConstKeyword */:
            return this.parseVariableStatement(context | 8388608 /* Const */);
        // VariableStatement[?Yield]
        case 12371 /* ExportKeyword */:
            if (context & 1 /* Module */)
                { this.error(49 /* ExportDeclAtTopLevel */); }
        case 274521 /* ImportKeyword */:
            // We must be careful not to parse a 'import()'
            // expression or 'import.meta' as an import declaration.
            if (this.flags & 2097152 /* OptionsNext */ && this.nextTokenIsLeftParenOrPeriod(context)) {
                return this.parseExpressionStatement(context);
            }
            if (context & 1 /* Module */)
                { this.error(50 /* ImportDeclAtTopLevel */); }
        default:
            return this.parseStatement(context);
    }
};
Parser.prototype.parseStatement = function parseStatement (context) {
    switch (this.token) {
        case 262145 /* Identifier */:
            return this.parseLabelledStatement(context);
        case 262155 /* LeftParen */:
            return this.parseExpressionStatement(context);
        // EmptyStatement
        case 17 /* Semicolon */:
            return this.parseEmptyStatement(context);
        // BlockStatement[?Yield, ?Return]
        case 393228 /* LeftBrace */:
            return this.parseBlockStatement(context);
        // VariableStatement[?Yield]
        case 8663111 /* VarKeyword */:
            return this.parseVariableStatement(context);
        // VariableStatement[?Yield]
        // [+Return] ReturnStatement[?Yield]
        case 12379 /* ReturnKeyword */:
            return this.parseReturnStatement(context);
        // IfStatement[?Yield, ?Return]
        case 12376 /* IfKeyword */:
            return this.parseIfStatement(context);
        // BreakStatement[?Yield]
        case 12362 /* BreakKeyword */:
            return this.parseBreakStatement(context);
        case 12374 /* ForKeyword */:
            return this.parseForStatement(context);
        case 12366 /* ContinueKeyword */:
            return this.parseContinueStatement(context);
        // DebuggerStatement
        case 12367 /* DebuggerKeyword */:
            return this.parseDebuggerStatement(context);
        // BreakableStatement[?Yield, ?Return]
        //
        // BreakableStatement[Yield, Return]:
        //   IterationStatement[?Yield, ?Return]
        //   SwitchStatement[?Yield, ?Return]
        case 12369 /* DoKeyword */:
            return this.parseDoWhileStatement(context);
        case 12385 /* WhileKeyword */:
            return this.parseWhileStatement(context);
        // WithStatement[?Yield, ?Return]
        case 12386 /* WithKeyword */:
            return this.parseWithStatement(context);
        case 274525 /* SwitchKeyword */:
            return this.parseSwitchStatement(context | 1024 /* TopLevel */);
        // ThrowStatement[?Yield]
        case 12383 /* ThrowKeyword */:
            return this.parseThrowStatement(context);
        // TryStatement[?Yield, ?Return]
        case 12384 /* TryKeyword */:
            return this.parseTryStatement(context);
        // AsyncFunctionDeclaration[Yield, Await, Default]
        // Both 'class' and 'function' are forbidden by lookahead restriction.
        case 282730 /* YieldKeyword */:
            return this.parseLabelledStatement(context);
        case 69740 /* AsyncKeyword */:
            // Here we do a quick lookahead so we just need to parse out the
            // 'AsyncFunctionDeclaration'. The 'parsePrimaryExpression' will do the
            // heavy work for us. I doubt this will cause any performance loss, but
            // if so is the case - this can be reverted later on.
            // J.K. Thomas
            if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                // Note: async function are only subject to AnnexB if we forbid them to parse
                if (context & 1024 /* TopLevel */ || this.flags & 32 /* Iteration */) {
                    this.throwUnexpectedToken();
                }
                if (this.flags & 2 /* HasUnicode */)
                    { this.error(68 /* UnexpectedEscapedKeyword */); }
                return this.parseFunctionDeclaration(context);
            }
            // 'Async' is a valid contextual keyword in sloppy mode for labelled statement, so either
            // parse out 'LabelledStatement' or an plain identifier. We pass down the 'Statement' mask
            // so we can easily switch async state if needed on "TopLevel" even if we are inside
            // the PrimaryExpression production
            return this.parseLabelledStatement(context | 1024 /* TopLevel */);
        case 274519 /* FunctionKeyword */:
            if (context & 4096 /* AnnexB */) {
                return this.parseFunctionDeclaration(context | 4096 /* AnnexB */);
            }
        case 274509 /* ClassKeyword */:
            this.error(98 /* ForbiddenAsStatement */, tokenDesc(this.token));
        default:
            return this.parseExpressionStatement(context);
    }
};
Parser.prototype.parseBlockStatement = function parseBlockStatement (context) {
        var this$1 = this;

    var pos = this.getLocations();
    var body = [];
    this.expect(context, 393228 /* LeftBrace */);
    var blockScope = this.blockScope;
    var parentScope = this.parentScope;
    if (blockScope != null)
        { this.parentScope = blockScope; }
    this.blockScope = context & 2048 /* IfClause */ ? blockScope : undefined;
    var flag = this.flags;
    while (this.token !== 15 /* RightBrace */) {
        body.push(this$1.parseStatementListItem(context | 1024 /* TopLevel */));
    }
    this.flags = flag;
    this.expect(context, 15 /* RightBrace */);
    this.blockScope = blockScope;
    if (parentScope != null)
        { this.parentScope = parentScope; }
    return this.finishNode(pos, {
        type: 'BlockStatement',
        body: body
    });
};
Parser.prototype.parseTryStatement = function parseTryStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12384 /* TryKeyword */);
    var block = this.parseBlockStatement(context);
    var handler = null;
    var finalizer = null;
    if (this.token === 12364 /* CatchKeyword */) {
        handler = this.parseCatchClause(context);
    }
    if (this.parseOptional(context, 12373 /* FinallyKeyword */)) {
        finalizer = this.parseBlockStatement(context);
    }
    if (!handler && !finalizer)
        { this.error(20 /* NoCatchOrFinally */); }
    return this.finishNode(pos, {
        type: 'TryStatement',
        block: block,
        handler: handler,
        finalizer: finalizer
    });
};
Parser.prototype.parseCatchClause = function parseCatchClause (context) {
    var pos = this.getLocations();
    this.expect(context, 12364 /* CatchKeyword */);
    // Create a lexical scope node around the whole catch clause
    var blockScope = this.blockScope;
    var parentScope = this.parentScope;
    if (blockScope !== undefined)
        { this.parentScope = blockScope; }
    this.blockScope = undefined;
    var param = null;
    if (!(this.flags & 2097152 /* OptionsNext */) || this.token === 262155 /* LeftParen */) {
        this.expect(context, 262155 /* LeftParen */);
        this.addCatchArg(this.tokenValue, 1 /* Shadowable */);
        param = this.parseBindingPatternOrIdentifier(context, pos);
        this.expect(context, 16 /* RightParen */);
    }
    var body = this.parseBlockStatement(context | 2048 /* IfClause */);
    this.blockScope = blockScope;
    if (blockScope !== undefined)
        { this.parentScope = parentScope; }
    return this.finishNode(pos, {
        type: 'CatchClause',
        param: param,
        body: body
    });
};
Parser.prototype.parseThrowStatement = function parseThrowStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12383 /* ThrowKeyword */);
    if (this.flags & 1 /* LineTerminator */)
        { this.error(21 /* LineBreakAfterThrow */); }
    var argument = this.parseExpression(context | 4 /* AllowIn */, pos);
    this.consumeSemicolon(context);
    return this.finishNode(pos, {
        type: 'ThrowStatement',
        argument: argument
    });
};
Parser.prototype.parseWithStatement = function parseWithStatement (context) {
    var pos = this.getLocations();
    // Strict mode code may not include a WithStatement. The occurrence of a WithStatement in such 
    // a context is an grammar error
    if (context & 2 /* Strict */)
        { this.error(22 /* StrictModeWith */); }
    this.expect(context, 12386 /* WithKeyword */);
    this.expect(context, 262155 /* LeftParen */);
    var object = this.parseExpression(context | 4 /* AllowIn */, pos);
    this.expect(context, 16 /* RightParen */);
    var body = this.parseStatement(context & ~1024 /* TopLevel */);
    return this.finishNode(pos, {
        type: 'WithStatement',
        object: object,
        body: body
    });
};
Parser.prototype.parseWhileStatement = function parseWhileStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12385 /* WhileKeyword */);
    this.expect(context, 262155 /* LeftParen */);
    var test = this.parseExpression(context | 4 /* AllowIn */, pos);
    this.expect(context, 16 /* RightParen */);
    var savedFlag = this.flags;
    this.flags |= 32 /* Iteration */;
    var body = this.parseStatement(context & ~1024 /* TopLevel */);
    this.flags = savedFlag;
    return this.finishNode(pos, {
        type: 'WhileStatement',
        test: test,
        body: body
    });
};
Parser.prototype.parseDoWhileStatement = function parseDoWhileStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12369 /* DoKeyword */);
    var savedFlag = this.flags;
    this.flags |= 32 /* Iteration */;
    var body = this.parseStatement(context & ~1024 /* TopLevel */);
    this.flags = savedFlag;
    this.expect(context, 12385 /* WhileKeyword */);
    this.expect(context, 262155 /* LeftParen */);
    var test = this.parseExpression(context & ~1024 /* TopLevel */ | 4 /* AllowIn */, pos);
    this.expect(context, 16 /* RightParen */);
    this.parseOptional(context, 17 /* Semicolon */);
    return this.finishNode(pos, {
        type: 'DoWhileStatement',
        body: body,
        test: test
    });
};
Parser.prototype.parseContinueStatement = function parseContinueStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12366 /* ContinueKeyword */);
    var label = null;
    if (!(this.flags & 1 /* LineTerminator */) && this.token === 262145 /* Identifier */) {
        label = this.parseIdentifierName(context, this.token);
        this.validateLabel(label.name);
    }
    if (!label && !(this.flags & 32 /* Iteration */))
        { this.error(16 /* BadContinue */); }
    this.consumeSemicolon(context);
    return this.finishNode(pos, {
        type: 'ContinueStatement',
        label: label
    });
};
Parser.prototype.parseBreakStatement = function parseBreakStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12362 /* BreakKeyword */);
    var label = null;
    if (!(this.flags & 1 /* LineTerminator */) && this.token === 262145 /* Identifier */) {
        label = this.parseIdentifierName(context, this.token);
        this.validateLabel(label.name);
    }
    if (!label && !(this.flags & (16 /* Break */ | 32 /* Iteration */))) {
        this.error(17 /* IllegalBreak */);
    }
    this.consumeSemicolon(context);
    return this.finishNode(pos, {
        type: 'BreakStatement',
        label: label
    });
};
Parser.prototype.parseForStatement = function parseForStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12374 /* ForKeyword */);
    var init = null;
    var declarations = null;
    var kind = '';
    var body;
    var test = null;
    var token = this.token;
    var state = 0;
    // Asynchronous Iteration - Stage 3 proposal
    if (context & 32 /* Await */ && this.parseOptional(context, 331885 /* AwaitKeyword */)) {
        // Throw " Unexpected token 'await'" if the option 'next' flag isn't set
        if (!(this.flags & 2097152 /* OptionsNext */))
            { this.error(1 /* UnexpectedToken */, tokenDesc(token)); }
        state |= 8 /* Await */;
    }
    var savedFlag = this.flags;
    // Create a lexical scope node around the whole ForStatement
    var blockScope = this.blockScope;
    var parentScope = this.parentScope;
    if (blockScope !== undefined)
        { this.parentScope = blockScope; }
    this.blockScope = undefined;
    this.expect(context, 262155 /* LeftParen */);
    if (this.token !== 17 /* Semicolon */) {
        switch (this.token) {
            case 8671304 /* LetKeyword */:
                if (!this.isLexical(context))
                    { break; }
                context |= 4194304 /* Let */ | 4 /* AllowIn */;
                state |= 4 /* Let */;
                break;
            case 8663111 /* VarKeyword */:
                state |= 1 /* Var */;
                break;
            case 8663113 /* ConstKeyword */:
                context |= 8388608 /* Const */ | 4 /* AllowIn */;
                state |= 2 /* Const */;
                break;
            default:
        }
        if (state & (6 /* Lexical */ | 1 /* Var */)) {
            var startIndex = this.getLocations();
            kind = tokenDesc(this.token);
            this.nextToken(context);
            declarations = this.parseVariableDeclarationList(context | 524288 /* ForStatement */);
            init = this.finishNode(startIndex, {
                type: 'VariableDeclaration',
                declarations: declarations,
                kind: kind
            });
        }
        else {
            init = this.parseExpression(context & ~4 /* AllowIn */ | 524288 /* ForStatement */, pos);
        }
    }
    this.flags = savedFlag;
    switch (this.token) {
        // 'of'
        case 69746 /* OfKeyword */:
            if (this.flags & 2 /* HasUnicode */)
                { this.error(68 /* UnexpectedEscapedKeyword */); }
            this.parseOptional(context, 69746 /* OfKeyword */);
            if (state & 7 /* Variable */) {
                // Only a single variable declaration is allowed in a for of statement
                if (declarations && declarations[0].init != null)
                    { this.error(32 /* InvalidVarInitForOf */); }
            }
            else {
                this.reinterpretAsPattern(context | 524288 /* ForStatement */, init);
                if (!isValidDestructuringAssignmentTarget(init))
                    { this.error(33 /* InvalidLHSInForLoop */); }
            }
            var right = this.parseAssignmentExpression(context);
            this.expect(context, 16 /* RightParen */);
            this.flags |= 32 /* Iteration */;
            body = this.parseStatement(context & ~1024 /* TopLevel */ | 524288 /* ForStatement */);
            this.flags = savedFlag;
            return this.finishNode(pos, {
                type: 'ForOfStatement',
                body: body,
                left: init,
                right: right,
                await: !!(state & 8 /* Await */)
            });
        // 'in'
        case 2111281 /* InKeyword */:
            if (state & 7 /* Variable */) {
                if (declarations && declarations.length !== 1)
                    { this.error(0 /* Unexpected */); }
            }
            else {
                this.reinterpretAsPattern(context | 524288 /* ForStatement */, init);
            }
            if (state & 8 /* Await */)
                { this.error(53 /* ForAwaitNotOf */); }
            this.expect(context, 2111281 /* InKeyword */);
            test = this.parseExpression(context, pos);
            this.expect(context, 16 /* RightParen */);
            this.flags |= 32 /* Iteration */;
            body = this.parseStatement(context & ~1024 /* TopLevel */ | 524288 /* ForStatement */);
            this.flags = savedFlag;
            return this.finishNode(pos, {
                type: 'ForInStatement',
                body: body,
                left: init,
                right: test
            });
        default:
            if (state & 8 /* Await */)
                { this.error(53 /* ForAwaitNotOf */); }
            var update = null;
            this.expect(context, 17 /* Semicolon */);
            if (this.token !== 17 /* Semicolon */ && this.token !== 16 /* RightParen */) {
                test = this.parseExpression(context, pos);
            }
            this.expect(context, 17 /* Semicolon */);
            if (this.token !== 16 /* RightParen */)
                { update = this.parseExpression(context, pos); }
            this.expect(context, 16 /* RightParen */);
            this.flags |= 32 /* Iteration */;
            body = this.parseStatement(context & ~1024 /* TopLevel */ | 524288 /* ForStatement */);
            this.flags = savedFlag;
            this.blockScope = blockScope;
            if (blockScope !== undefined)
                { this.parentScope = parentScope; }
            return this.finishNode(pos, {
                type: 'ForStatement',
                body: body,
                init: init,
                test: test,
                update: update
            });
    }
};
Parser.prototype.parseIfStatementChild = function parseIfStatementChild (context) {
    if (context & 2 /* Strict */ && this.token === 274519 /* FunctionKeyword */) {
        this.error(98 /* ForbiddenAsStatement */, tokenDesc(this.token));
    }
    return this.parseStatement(context | (4096 /* AnnexB */ | 1024 /* TopLevel */));
};
Parser.prototype.parseIfStatement = function parseIfStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12376 /* IfKeyword */);
    this.expect(context, 262155 /* LeftParen */);
    // An IF node has three kids: test, alternate, and optional else
    var test = this.parseExpression(context | 4 /* AllowIn */, pos);
    this.expect(context, 16 /* RightParen */);
    var savedFlag = this.flags;
    var consequent = this.parseIfStatementChild(context);
    var alternate = null;
    if (this.parseOptional(context, 12370 /* ElseKeyword */))
        { alternate = this.parseIfStatementChild(context); }
    this.flags = savedFlag;
    return this.finishNode(pos, {
        type: 'IfStatement',
        test: test,
        alternate: alternate,
        consequent: consequent
    });
};
Parser.prototype.parseDebuggerStatement = function parseDebuggerStatement (context) {
    var pos = this.getLocations();
    this.expect(context, 12367 /* DebuggerKeyword */);
    this.consumeSemicolon(context);
    return this.finishNode(pos, {
        type: 'DebuggerStatement'
    });
};
Parser.prototype.parseSwitchStatement = function parseSwitchStatement (context) {
        var this$1 = this;

    var pos = this.getLocations();
    this.expect(context, 274525 /* SwitchKeyword */);
    this.expect(context, 262155 /* LeftParen */);
    var discriminant = this.parseExpression(context, pos);
    this.expect(context, 16 /* RightParen */);
    this.expect(context, 393228 /* LeftBrace */);
    var blockScope = this.blockScope;
    var parentScope = this.parentScope;
    if (blockScope !== undefined)
        { this.parentScope = blockScope; }
    this.blockScope = undefined;
    var cases = [];
    var seenDefault = false;
    var SavedFlag = this.flags;
    this.flags |= (16 /* Break */ | 64 /* Switch */);
    while (this.token !== 15 /* RightBrace */) {
        var clause = this$1.parseSwitchCase(context);
        if (clause.test === null) {
            // Error on duplicate 'default' clauses
            if (seenDefault)
                { this$1.error(18 /* MultipleDefaultsInSwitch */); }
            seenDefault = true;
        }
        cases.push(clause);
    }
    this.flags = SavedFlag;
    this.expect(context, 15 /* RightBrace */);
    this.blockScope = blockScope;
    if (blockScope !== undefined)
        { this.parentScope = parentScope; }
    return this.finishNode(pos, {
        type: 'SwitchStatement',
        discriminant: discriminant,
        cases: cases
    });
};
Parser.prototype.parseSwitchCase = function parseSwitchCase (context) {
        var this$1 = this;

    var pos = this.getLocations();
    var test = null;
    switch (this.token) {
        // 'case'
        case 12363 /* CaseKeyword */:
            this.nextToken(context);
            test = this.parseExpression(context, pos);
            break;
        // 'default'
        case 12368 /* DefaultKeyword */:
            this.nextToken(context);
            break;
        default: // ignore
    }
    this.expect(context, 21 /* Colon */);
    var consequent = [];
    loop: while (true) {
        switch (this$1.token) {
            // '}'
            case 15 /* RightBrace */:
            // 'default'
            case 12368 /* DefaultKeyword */:
            // 'case'
            case 12363 /* CaseKeyword */:
                break loop;
            default:
                consequent.push(this$1.parseStatementListItem(context));
        }
    }
    return this.finishNode(pos, {
        type: 'SwitchCase',
        test: test,
        consequent: consequent,
    });
};
Parser.prototype.parseEmptyStatement = function parseEmptyStatement (context) {
    var pos = this.getLocations();
    this.nextToken(context);
    return this.finishNode(pos, {
        type: 'EmptyStatement'
    });
};
Parser.prototype.parseFunctionDeclaration = function parseFunctionDeclaration (context) {
    var pos = this.getLocations();
    var parentContext = context;
    context &= ~(32 /* Await */ | 16 /* Yield */);
    if (this.parseOptional(context, 69740 /* AsyncKeyword */))
        { context |= 32 /* Await */; }
    this.expect(context, 274519 /* FunctionKeyword */);
    if (this.token === 2099763 /* Multiply */) {
        // Annex B.3.4 doesn't allow generators functions
        if (context & 4096 /* AnnexB */)
            { this.error(98 /* ForbiddenAsStatement */, tokenDesc(this.token)); }
        // If we are in the 'await' context. Check if the 'Next' option are set
        // and allow use of async generators. Throw a decent error message if this isn't the case
        if (context & 32 /* Await */ && !(this.flags & 2097152 /* OptionsNext */))
            { this.error(99 /* InvalidAsyncGenerator */); }
        this.expect(context, 2099763 /* Multiply */);
        context |= 16 /* Yield */;
    }
    var id = null;
    var savedFlags = this.flags;
    if (this.token !== 262155 /* LeftParen */) {
        var name = this.tokenValue;
        var token = this.token;
        if (!this.isIdentifier(context, token))
            { this.throwUnexpectedToken(); }
        switch (token) {
            case 282730 /* YieldKeyword */:
                if (parentContext & 16 /* Yield */)
                    { this.error(83 /* DisallowedInContext */, tokenDesc(token)); }
                break;
            case 331885 /* AwaitKeyword */:
                if (context & 1 /* Module */)
                    { this.throwUnexpectedToken(); }
                // 'await' is forbidden only in async function bodies (but not in child functions) and module code.
                if (context & 32 /* Await */ && this.flags & 4 /* InFunctionBody */)
                    { this.error(83 /* DisallowedInContext */, tokenDesc(token)); }
            default: // ignore
        }
        if (context & 1024 /* TopLevel */ && !(context & 4096 /* AnnexB */)) {
            if (!this.initBlockScope() && (this.blockScope !== this.functionScope && this.blockScope[name] ||
                this.blockScope[name] === 2 /* NonShadowable */)) {
                this.error(71 /* DuplicateIdentifier */, name);
            }
            this.blockScope[name] = 1 /* Shadowable */;
        }
        id = this.parseBindingIdentifier(context);
    }
    else if (!(context & 32768 /* OptionalIdentifier */))
        { this.error(87 /* UnNamedFunctionStmt */); }
    var savedScope = this.enterFunctionScope();
    var params = this.parseParameterList(context & ~(1024 /* TopLevel */ | 32768 /* OptionalIdentifier */) | 128 /* InParameter */, 0 /* None */);
    var body = this.parseFunctionBody(context & ~32768 /* OptionalIdentifier */);
    this.exitFunctionScope(savedScope);
    this.flags = savedFlags;
    return this.finishNode(pos, {
        type: 'FunctionDeclaration',
        params: params,
        body: body,
        async: !!(context & 32 /* Await */),
        generator: !!(context & 16 /* Yield */),
        expression: false,
        id: id
    });
};
Parser.prototype.parseReturnStatement = function parseReturnStatement (context) {
    var pos = this.getLocations();
    if (!(this.flags & 67108868 /* GlobalReturn */))
        { this.error(19 /* IllegalReturn */); }
    this.expect(context, 12379 /* ReturnKeyword */);
    var argument = null;
    if (!this.canConsumeSemicolon()) {
        argument = this.parseExpression(context | 4 /* AllowIn */, pos);
    }
    this.consumeSemicolon(context);
    return this.finishNode(pos, {
        type: 'ReturnStatement',
        argument: argument
    });
};
Parser.prototype.parseLabelledStatement = function parseLabelledStatement (context) {
    var pos = this.getLocations();
    var expr = this.parseExpression(context | 4 /* AllowIn */, pos);
    if (this.token === 21 /* Colon */ && expr.type === 'Identifier') {
        this.expect(context, 21 /* Colon */);
        var key = '@' + expr.name;
        if (this.labelSet === undefined)
            { this.labelSet = {}; }
        else if (this.labelSet[key] === true)
            { this.error(73 /* Redeclaration */, expr.name); }
        this.labelSet[key] = true;
        var body;
        if (this.token === 274519 /* FunctionKeyword */) {
            // '13.1.1 - Static Semantics: ContainsDuplicateLabels', says it's a syntax error if
            // LabelledItem: FunctionDeclaration is ever matched. Annex B.3.2 changes this behaviour.
            if (context & 2 /* Strict */)
                { this.error(15 /* StrictFunction */); }
            // AnnexB allows function declaration as labels, but not async func or generator func because the
            // generator declaration is only matched by a hoistable declaration in StatementListItem.
            // To fix this we need to pass the 'AnnexB' mask, and let it throw in 'parseFunctionDeclaration'
            // We also unset the 'ForStatement' mask because we are no longer inside a 'ForStatement'.
            body = this.parseFunctionDeclaration(context | 4096 /* AnnexB */ | 1024 /* TopLevel */);
        }
        else {
            body = this.parseStatement(context | 1024 /* TopLevel */);
        }
        this.labelSet[key] = false;
        return this.finishNode(pos, {
            type: 'LabeledStatement',
            label: expr,
            body: body
        });
    }
    else {
        this.consumeSemicolon(context);
        return this.finishNode(pos, {
            type: 'ExpressionStatement',
            expression: expr
        });
    }
};
Parser.prototype.parseExpressionStatement = function parseExpressionStatement (context) {
    var pos = this.getLocations();
    var expr = this.parseExpression(context | 4 /* AllowIn */, pos);
    this.consumeSemicolon(context);
    return this.finishNode(pos, {
        type: 'ExpressionStatement',
        expression: expr
    });
};
Parser.prototype.parseVariableStatement = function parseVariableStatement (context) {
    var pos = this.getLocations();
    var token = this.token;
    if (this.flags & 2 /* HasUnicode */)
        { this.error(0 /* Unexpected */); }
    this.nextToken(context);
    var declarations = this.parseVariableDeclarationList(context | 4 /* AllowIn */);
    this.consumeSemicolon(context);
    return this.finishNode(pos, {
        type: 'VariableDeclaration',
        declarations: declarations,
        kind: tokenDesc(token)
    });
};
Parser.prototype.parseVariableDeclarationList = function parseVariableDeclarationList (context) {
        var this$1 = this;

    var list = [this.parseVariableDeclaration(context)];
    while (this.parseOptional(context, 18 /* Comma */)) {
        list.push(this$1.parseVariableDeclaration(context));
    }
    return list;
};
Parser.prototype.parseVariableDeclaration = function parseVariableDeclaration (context) {
    var pos = this.getLocations();
    var init = null;
    var token = this.token;
    var id = this.parseBindingPatternOrIdentifier(context, pos);
    // 'let', 'const'
    if (context & 12582912 /* Lexical */) {
        if (context & 8388608 /* Const */) {
            if (!(this.token === 2111281 /* InKeyword */ || this.token === 69746 /* OfKeyword */)) {
                if (this.parseOptional(context, 1310749 /* Assign */)) {
                    init = this.parseAssignmentExpression(context);
                }
                else {
                    this.error(31 /* DeclarationMissingInitializer */, 'const');
                }
            }
        }
        else if ((!(context & 524288 /* ForStatement */) && token !== 262145 /* Identifier */) || this.token === 1310749 /* Assign */) {
            this.expect(context, 1310749 /* Assign */);
            init = this.parseAssignmentExpression(context);
        }
    }
    else {
        if (this.parseOptional(context, 1310749 /* Assign */)) {
            init = this.parseAssignmentExpression(context);
            if (context & 524288 /* ForStatement */) {
                if (this.token === 2111281 /* InKeyword */) {
                    if (context & 2 /* Strict */ || hasMask(token, 131072 /* BindingPattern */)) {
                        this.error(92 /* InvalidVarDeclInForIn */);
                    }
                }
            }
        }
        else if (!(context & 524288 /* ForStatement */) && hasMask(token, 131072 /* BindingPattern */)) {
            this.error(104 /* InvalidComplexBindingPattern */);
        }
    }
    return this.finishNode(pos, {
        type: 'VariableDeclarator',
        init: init,
        id: id
    });
};
Parser.prototype.parseExpression = function parseExpression (context, pos) {
        var this$1 = this;

    var expr = this.parseAssignmentExpression(context);
    if (this.token !== 18 /* Comma */)
        { return expr; }
    var expressions = [expr];
    while (this.parseOptional(context, 18 /* Comma */)) {
        expressions.push(this$1.parseAssignmentExpression(context));
    }
    return this.finishNode(pos, {
        type: 'SequenceExpression',
        expressions: expressions
    });
};
Parser.prototype.parseYieldExpression = function parseYieldExpression (context, pos) {
    this.expect(context, 282730 /* YieldKeyword */);
    var argument = null;
    var delegate = false;
    if (!(this.flags & 1 /* LineTerminator */)) {
        delegate = this.parseOptional(context, 2099763 /* Multiply */);
        if (delegate) {
            argument = this.parseAssignmentExpression(context);
        }
        else if (hasMask(this.token, 262144 /* ExpressionStart */)) {
            argument = this.parseAssignmentExpression(context);
        }
    }
    return this.finishNode(pos, {
        type: 'YieldExpression',
        argument: argument,
        delegate: delegate
    });
};
Parser.prototype.parseAssignmentExpression = function parseAssignmentExpression (context) {
    var pos = this.getLocations();
    if (context & 16 /* Yield */ && this.token === 282730 /* YieldKeyword */)
        { return this.parseYieldExpression(context, pos); }
    var token = this.token;
    var expr = this.parseConditionalExpression(context, pos);
    // If that's the case - parse out a arrow function with a single un-parenthesized parameter.
    // An async one, will be parsed out in 'parsePrimaryExpression'
    if (this.token === 10 /* Arrow */ && (this.isIdentifier(context | 8 /* SimpleArrow */, token))) {
        if (!(this.flags & 1 /* LineTerminator */)) {
            // Note! This is a simple arrow function with no CoverParenthesizedExpressionAndArrowParameterList production.
            //
            // It does 3 things:
            //
            // 1.) Checks reserved words
            // 2.) Eval and arguments
            // 3.) Invalid non-Identifier productions
            if (this.isEvalOrArgumentsIdentifier(context, expr.name)) {
                this.error(80 /* UnexpectedStrictReserved */);
            }
            if (expr.type !== 'Identifier')
                { this.throwUnexpectedToken(); }
            // Invalid: 'package => { "use strict"}"'
            if (hasMask(token, 20480 /* FutureReserved */)) {
                // Note: We track the error location here. Let say we are parsing 'package => { "use strict"}".
                // In this case the reported error location will be "index: 7, lineNumber 1". "7" is the
                // last character in the reserved word "package". So we record it from there and report it
                // as invalid. Maybe wrong? It can be adjusted! But in RL we don't know if a word is wrong or not
                // before we have read it, so this was designed from that logic.
                if (!this.errorLocation)
                    { this.errorLocation = this.getLocations(); }
                this.flags |= 1024 /* BindingPosition */;
            }
            return this.parseArrowFunction(context & ~(32 /* Await */) | 8 /* SimpleArrow */, pos, [expr]);
        }
    }
    if (hasMask(this.token, 1310720 /* AssignOperator */)) {
        var operator = this.token;
        if (this.isEvalOrArgumentsIdentifier(context, expr.name)) {
            this.error(35 /* StrictLHSAssignment */);
        }
        else if (!(context & 128 /* InParameter */) && this.token === 1310749 /* Assign */) {
            this.reinterpretAsPattern(context, expr);
        }
        else if (!isValidSimpleAssignmentTarget(expr)) {
            this.error(36 /* InvalidLHSInAssignment */);
        }
        this.nextToken(context);
        var right = this.parseAssignmentExpression(context | 4 /* AllowIn */);
        return this.finishNode(pos, {
            type: 'AssignmentExpression',
            left: expr,
            operator: tokenDesc(operator),
            right: right
        });
    }
    return expr;
};
Parser.prototype.reinterpretAsPattern = function reinterpretAsPattern (context, params) {
        var this$1 = this;

    switch (params.type) {
        case 'Identifier':
            if (context & 512 /* InArrowParameterList */) {
                if (context & 32 /* Await */) {
                    // Duplicate param validation are only done in "struct mode" for
                    // async arrow functions
                    if (context & 2 /* Strict */)
                        { this.addFunctionArg(params.name); }
                }
                else {
                    this.addFunctionArg(params.name);
                }
            }
            return;
        case 'ObjectExpression':
            if (this.flags & 32768 /* ParenthesizedPattern */)
                { this.error(70 /* InvalidParenthesizedPattern */); }
            params.type = 'ObjectPattern';
        // falls through
        case 'ObjectPattern':
            // ObjectPattern and ObjectExpression are isomorphic
            for (var i = 0; i < params.properties.length; i++) {
                var property = params.properties[i];
                if (!(context & 524288 /* ForStatement */) && property.kind !== 'init')
                    { this$1.throwUnexpectedToken(); }
                this$1.reinterpretAsPattern(context, property.type === 'SpreadElement' ? property : property.value);
            }
            return;
        case 'ArrayExpression':
            if (this.flags & 32768 /* ParenthesizedPattern */)
                { this.error(70 /* InvalidParenthesizedPattern */); }
            params.type = 'ArrayPattern';
        // falls through
        case 'ArrayPattern':
            for (var i$1 = 0; i$1 < params.elements.length; ++i$1) {
                // skip holes in pattern
                if (params.elements[i$1] !== null)
                    { this$1.reinterpretAsPattern(context, params.elements[i$1]); }
            }
            return;
        case 'AssignmentExpression':
            if (!(context & 512 /* InArrowParameterList */) && params.operator !== '=')
                { this.throwUnexpectedToken(); }
            params.type = 'AssignmentPattern';
            delete params.operator;
        // Fall through
        case 'AssignmentPattern':
            this.reinterpretAsPattern(context, params.left);
            return;
        case 'SpreadElement':
            params.type = 'RestElement';
            if (context & 524288 /* ForStatement */ && params.argument.type === 'AssignmentExpression') {
                this.error(34 /* InvalidLHSInForIn */);
            }
        // Fall through
        case 'RestElement':
            this.reinterpretAsPattern(context, params.argument);
            return;
        case 'MemberExpression':
        case 'MetaProperty':
            if (!(context & 512 /* InArrowParameterList */))
                { return; }
        // Fall through
        default:
            this.throwUnexpectedToken();
    }
};
Parser.prototype.parseArrowFunction = function parseArrowFunction (context, pos, params) {
        var this$1 = this;

    // A line terminator between ArrowParameters and the => should trigger a SyntaxError.
    if (this.flags & 1 /* LineTerminator */)
        { this.error(67 /* LineBreakAfterAsync */); }
    this.expect(context, 10 /* Arrow */);
    context &= ~16 /* Yield */;
    // Unsetting the 'AllowCall' mask here, let the parser fail correctly
    // if a non-simple arrow are followed by a call expression.
    //
    //  (a) => {}()
    //
    if (this.flags & 8 /* AllowCall */)
        { this.flags &= ~8 /* AllowCall */; }
    var savedScope = this.enterFunctionScope();
    // A 'simple arrow' is just a plain identifier and doesn't have any param list.
    if (!(context & 8 /* SimpleArrow */)) {
        for (var i in params)
            { this$1.reinterpretAsPattern(context | 512 /* InArrowParameterList */, params[i]); }
    }
    var body;
    var expression = false;
    if (this.token === 393228 /* LeftBrace */) {
        // An arrow function could be a non-trailing member of a comma
        // expression or a semicolon terminating a full expression. In this
        // cases this productions are valid:
        //
        //   a => {}, b;
        //   (a => {}), b;
        //
        // However. If the arrow function ends a statement, ASI permits the
        // next token to start an expression statement wich makes
        // this production invalid:
        //
        //   a => {} /x/g;   // regular expression as a division
        //
        body = this.parseFunctionBody(context & ~64 /* InParenthesis */ | 4 /* AllowIn */);
    }
    else {
        body = this.parseAssignmentExpression(context & ~64 /* InParenthesis */ | 4 /* AllowIn */);
        expression = true;
    }
    this.exitFunctionScope(savedScope);
    return this.finishNode(pos, {
        type: 'ArrowFunctionExpression',
        body: body,
        params: params,
        id: null,
        async: !!(context & 32 /* Await */),
        generator: !!(context & 16 /* Yield */),
        expression: expression
    });
};
Parser.prototype.parseConditionalExpression = function parseConditionalExpression (context, pos) {
    var expr = this.parseBinaryExpression(context, 0, pos);
    if (!this.parseOptional(context, 22 /* QuestionMark */))
        { return expr; }
    var consequent = this.parseAssignmentExpression(context | 4 /* AllowIn */);
    this.expect(context, 21 /* Colon */);
    var alternate = this.parseAssignmentExpression(context);
    return this.finishNode(pos, {
        type: 'ConditionalExpression',
        test: expr,
        consequent: consequent,
        alternate: alternate
    });
};
Parser.prototype.parseBinaryExpression = function parseBinaryExpression (context, minPrec, pos, expr) {
        var this$1 = this;
        if ( expr === void 0 ) expr = this.parseUnaryExpression(context);

    while (true) {
        var prec = this$1.token & 3840;
        if (prec === 0)
            { return expr; }
        if (!(context & 4 /* AllowIn */) && this$1.token === 2111281 /* InKeyword */)
            { break; }
        // Only ** is right to left.
        var operator = this$1.token === 2100022 /* Exponentiate */ ? prec >= minPrec : prec > minPrec;
        if (!operator)
            { break; }
        var binaryOperator = this$1.token;
        this$1.nextToken(context);
        expr = this$1.finishNode(pos, {
            type: (binaryOperator === 2097719 /* LogicalAnd */ || binaryOperator === 2097464 /* LogicalOr */) ?
                'LogicalExpression' : 'BinaryExpression',
            left: expr,
            right: this$1.parseBinaryExpression(context, prec, this$1.getLocations()),
            operator: tokenDesc(binaryOperator)
        });
    }
    return expr;
};
// 12.5 Unary Operators
Parser.prototype.parseUnaryExpression = function parseUnaryExpression (context) {
    // Fast path for "await" expression
    if (context & 32 /* Await */ && this.token === 331885 /* AwaitKeyword */) {
        return this.parseAwaitExpression(context);
    }
    var pos = this.getLocations();
    var expr;
    if (hasMask(this.token, 4456448 /* UnaryOperator */)) {
        var token = this.token;
        expr = this.parseUnaryExpressionFastPath(context);
        // When a delete operator occurs within strict mode code, a SyntaxError is thrown if its
        // UnaryExpression is a direct reference to a variable, function argument, or function name
        if (context & 2 /* Strict */ && token === 4468779 /* DeleteKeyword */ && expr.argument.type === 'Identifier') {
            this.error(45 /* StrictDelete */);
        }
        if (this.token === 2100022 /* Exponentiate */)
            { this.error(0 /* Unexpected */); }
    }
    else {
        expr = this.parseUpdateExpression(context, pos);
    }
    return this.parseExponentiationExpression(context, expr, pos);
};
// 12.6 Exponentiation Operator
Parser.prototype.parseExponentiationExpression = function parseExponentiationExpression (context, expr, pos) {
    // Note: Average microbenchmark result for exponentiation production are 1.4 mill ops /sec
    if (this.token !== 2100022 /* Exponentiate */)
        { return expr; }
    var precedence = hasMask(this.token, 2097152 /* BinaryOperator */) ? this.token & 3840 /* Precedence */ : 0;
    return this.parseBinaryExpression(context, precedence, pos, expr);
};
Parser.prototype.parseAwaitExpression = function parseAwaitExpression (context) {
    var pos = this.getLocations();
    if (this.flags & 2 /* HasUnicode */)
        { this.error(68 /* UnexpectedEscapedKeyword */); }
    this.expect(context, 331885 /* AwaitKeyword */);
    return this.finishNode(pos, {
        type: 'AwaitExpression',
        argument: this.parseUnaryExpressionFastPath(context)
    });
};
Parser.prototype.parseUnaryExpressionFastPath = function parseUnaryExpressionFastPath (context) {
    var pos = this.getLocations();
    if (hasMask(this.token, 4456448 /* UnaryOperator */)) {
        var token = this.token;
        this.nextToken(context);
        return this.finishNode(pos, {
            type: 'UnaryExpression',
            operator: tokenDesc(token),
            argument: this.parseUnaryExpressionFastPath(context),
            prefix: true
        });
    }
    return this.parseUpdateExpression(context, pos);
};
Parser.prototype.parseUpdateExpression = function parseUpdateExpression (context, pos) {
    var expr;
    if (hasMask(this.token, 786432 /* UpdateOperator */)) {
        var operator = this.token;
        this.nextToken(context);
        expr = this.parseLeftHandSideExpression(context, pos);
        if (this.isEvalOrArgumentsIdentifier(context, expr.name)) {
            this.error(46 /* StrictLHSPrefix */);
        }
        else if (!isValidSimpleAssignmentTarget(expr))
            { this.error(36 /* InvalidLHSInAssignment */); }
        return this.finishNode(pos, {
            type: 'UpdateExpression',
            operator: tokenDesc(operator),
            prefix: true,
            argument: expr
        });
    }
    expr = this.parseLeftHandSideExpression(context, pos);
    if (hasMask(this.token, 786432 /* UpdateOperator */) && !(this.flags & 1 /* LineTerminator */)) {
        // The identifier eval or arguments may not appear as the LeftHandSideExpression of an
        // Assignment operator(12.15) or of a PostfixExpression or as the UnaryExpression
        // operated upon by a Prefix Increment(12.4.6) or a Prefix Decrement(12.4.7) operator.
        if (this.isEvalOrArgumentsIdentifier(context, expr.name)) {
            this.error(47 /* StrictLHSPostfix */);
        }
        if (!isValidSimpleAssignmentTarget(expr))
            { this.error(36 /* InvalidLHSInAssignment */); }
        var operator$1 = this.token;
        this.nextToken(context);
        return this.finishNode(pos, {
            type: 'UpdateExpression',
            argument: expr,
            operator: tokenDesc(operator$1),
            prefix: false
        });
    }
    return expr;
};
Parser.prototype.parseSuper = function parseSuper (context) {
    var pos = this.getLocations();
    this.expect(context, 274524 /* SuperKeyword */);
    switch (this.token) {
        // '('
        case 262155 /* LeftParen */:
            // The super property has to be within a class constructor
            if (!(context & 262144 /* Constructor */))
                { this.error(60 /* BadSuperCall */); }
            break;
        // '.'
        case 13 /* Period */:
            if (!(context & 65536 /* Method */))
                { this.error(60 /* BadSuperCall */); }
            break;
        // '['
        case 393235 /* LeftBracket */:
            if (!(context & 65536 /* Method */))
                { this.error(60 /* BadSuperCall */); }
            break;
        default:
            this.throwUnexpectedToken();
    }
    return this.finishNode(pos, {
        type: 'Super'
    });
};
Parser.prototype.parseImport = function parseImport (context, pos) {
    var id = this.parseIdentifier(context);
    switch (this.token) {
        // Import.meta - Stage 3 proposal
        case 13 /* Period */:
            if (!(context & 1 /* Module */))
                { this.error(0 /* Unexpected */); }
            this.expect(context, 13 /* Period */);
            if (this.tokenValue !== 'meta')
                { this.error(0 /* Unexpected */); }
            return this.parseMetaProperty(context, id, pos);
        default:
            return this.finishNode(pos, {
                type: 'Import'
            });
    }
};
// 12.3 Left-Hand-Side Expressions
Parser.prototype.parseLeftHandSideExpression = function parseLeftHandSideExpression (context, pos) {
    // LeftHandSideExpression[Yield]:
    // NewExpression[?Yield]
    // CallExpression[?Yield]
    var expr;
    switch (this.token) {
        // 'super'
        case 274524 /* SuperKeyword */:
            expr = this.parseSuper(context);
            break;
        // 'import'
        case 274521 /* ImportKeyword */:
            if (!(this.flags & 2097152 /* OptionsNext */)) {
                this.throwUnexpectedToken();
            }
            context |= 16384 /* Import */;
            expr = this.parseImport(context, pos);
            break;
        default:
            expr = this.parseMemberExpression(context, pos);
    }
    if (!(this.flags & 8 /* AllowCall */) && expr.type === 'ArrowFunctionExpression') {
        return expr;
    }
    return this.parseCallExpression(context | 4 /* AllowIn */, pos, expr);
};
Parser.prototype.parseMemberExpression = function parseMemberExpression (context, pos, expr) {
        var this$1 = this;
        if ( expr === void 0 ) expr = this.parsePrimaryExpression(context, pos);

    while (true) {
        switch (this$1.token) {
            // '.'
            case 13 /* Period */:
                {
                    this$1.expect(context, 13 /* Period */);
                    var property = this$1.parseIdentifier(context);
                    expr = this$1.finishNode(pos, {
                        type: 'MemberExpression',
                        object: expr,
                        computed: false,
                        property: property,
                    });
                    break;
                }
            // '['
            case 393235 /* LeftBracket */:
                {
                    this$1.expect(context, 393235 /* LeftBracket */);
                    var start = this$1.getLocations();
                    var property$1 = this$1.parseExpression(context | 4 /* AllowIn */, start);
                    this$1.expect(context, 20 /* RightBracket */);
                    expr = this$1.finishNode(pos, {
                        type: 'MemberExpression',
                        object: expr,
                        computed: true,
                        property: property$1,
                    });
                    break;
                }
            case 262152 /* TemplateCont */:
            case 262153 /* TemplateTail */:
                {
                    var quasiPos = this$1.getLocations();
                    var quasi = this$1.token === 262152 /* TemplateCont */ ?
                        this$1.parseTemplate(context | 1048576 /* TaggedTemplate */, quasiPos) : this$1.parseTemplateTail(context | 1048576 /* TaggedTemplate */, quasiPos);
                    expr = this$1.parseTaggedTemplateExpression(context, expr, quasi, pos);
                    break;
                }
            default:
                return expr;
        }
    }
};
Parser.prototype.parseCallExpression = function parseCallExpression (context, pos, expr) {
        var this$1 = this;

    while (true) {
        expr = this$1.parseMemberExpression(context, pos, expr);
        switch (this$1.token) {
            case 262155 /* LeftParen */:
                var args = this$1.parseArguments(context & ~128 /* InParameter */, pos);
                if (context & 16384 /* Import */ && args.length !== 1 &&
                    expr.type === 'Import')
                    { this$1.error(14 /* BadImportCallArity */); }
                expr = this$1.finishNode(pos, {
                    type: 'CallExpression',
                    callee: expr,
                    arguments: args
                });
                break;
            default:
                return expr;
        }
    }
};
Parser.prototype.parseFunctionExpression = function parseFunctionExpression (context, pos) {
    this.expect(context, 274519 /* FunctionKeyword */);
    if (this.token === 2099763 /* Multiply */) {
        // If we are in the 'await' context. Check if the 'Next' option are set
        // and allow us to use async generators. If not, throw a decent error message if this isn't the case
        if (context & 32 /* Await */ && !(this.flags & 2097152 /* OptionsNext */))
            { this.error(99 /* InvalidAsyncGenerator */); }
        this.expect(context, 2099763 /* Multiply */);
        context |= 16 /* Yield */;
    }
    var id = null;
    if (this.token !== 262155 /* LeftParen */) {
        var token = this.token;
        if (!this.isIdentifier(context, token))
            { this.throwUnexpectedToken(); }
        if (this.isEvalOrArgumentsIdentifier(context, this.tokenValue))
            { this.error(35 /* StrictLHSAssignment */); }
        switch (token) {
            case 331885 /* AwaitKeyword */:
            case 282730 /* YieldKeyword */:
                if (context & (32 /* Await */ | 16 /* Yield */)) {
                    this.error(83 /* DisallowedInContext */, tokenDesc(token));
                }
                break;
            default: // ignore
        }
        id = this.parseIdentifier(context);
    }
    var savedScope = this.enterFunctionScope();
    var params = this.parseParameterList(context | 128 /* InParameter */, 0 /* None */);
    var body = this.parseFunctionBody(context);
    this.exitFunctionScope(savedScope);
    return this.finishNode(pos, {
        type: 'FunctionExpression',
        params: params,
        body: body,
        async: !!(context & 32 /* Await */),
        generator: !!(context & 16 /* Yield */),
        expression: false,
        id: id
    });
};
Parser.prototype.parseParameterList = function parseParameterList (context, state) {
        var this$1 = this;

    // FormalParameters [Yield,Await]: (modified)
    //  [empty]
    //  FormalParameterList[?Yield,Await]
    //
    // FormalParameter[Yield,Await]: (modified)
    //  BindingElement[?Yield,Await]
    //
    // BindingElement [Yield,Await]: (modified)
    //  SingleNameBinding[?Yield,?Await]
    //  BindingPattern[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
    //
    // SingleNameBinding [Yield,Await]:
    //  BindingIdentifier[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
    this.expect(context, 262155 /* LeftParen */);
    var result = [];
    this.flags &= ~16384 /* SimpleParameterList */;
    while (this.token !== 16 /* RightParen */) {
        if (this$1.token === 14 /* Ellipsis */) {
            this$1.flags |= 16384 /* SimpleParameterList */;
            result.push(this$1.parseRestElement(context));
            this$1.parseOptional(context, 18 /* Comma */);
            break;
        }
        result.push(this$1.parseFormalParameter(context));
        if (this$1.token !== 16 /* RightParen */)
            { this$1.expect(context, 18 /* Comma */); }
    }
    if (state & 16 /* Get */ && result.length > 0) {
        this.error(23 /* BadGetterArity */);
    }
    if (state & 32 /* Set */ && result.length !== 1) {
        this.error(24 /* BadSetterArity */);
    }
    this.expect(context, 16 /* RightParen */);
    return result;
};
Parser.prototype.parseFormalParameter = function parseFormalParameter (context) {
    var pos = this.getLocations();
    if (this.token !== 262145 /* Identifier */) {
        this.errorLocation = pos;
        this.flags |= 16384 /* SimpleParameterList */;
    }
    var left = this.parseBindingPatternOrIdentifier(context, pos);
    // Initializer[In, Yield] :
    // = AssignmentExpression[?In, ?Yield]
    if (!this.parseOptional(context, 1310749 /* Assign */))
        { return left; }
    switch (this.token) {
        case 282730 /* YieldKeyword */:
        case 331885 /* AwaitKeyword */:
            if (context & 32 /* Await */ || (context & (2 /* Strict */ | 16 /* Yield */))) {
                this.error(83 /* DisallowedInContext */, tokenDesc(this.token));
            }
        default: // ignore
    }
    var right = this.parseAssignmentExpression(context);
    return this.finishNode(pos, {
        type: 'AssignmentPattern',
        left: left,
        right: right
    });
};
Parser.prototype.parseAsyncFunctionExpression = function parseAsyncFunctionExpression (context, pos) {
    // Note: We are "bending" the EcmaScript specs a litle, and expand
    // the AsyncFunctionExpression production to also deal with
    // CoverCallExpressionAndAsyncArrowHead and AsyncArrowFunction productions.
    // This to avoid complications with the CoverCallExpressionAndAsyncArrowHead production
    // and ArrowFunction production where the latter has to parse out programs. like:
    //
    //  async a => {}
    //  () => {}
    //
    var isEscaped = !!(this.flags & 2 /* HasUnicode */);
    var id = this.parseIdentifier(context);
    var flags = this.flags;
    this.flags |= 16384 /* SimpleParameterList */;
    switch (this.token) {
        // 'parseAsyncFunctionExpression'
        case 274519 /* FunctionKeyword */:
            // The specs says "async[no LineTerminator here]", so just return an plain identifier in case
            // we got an LineTerminator. The 'FunctionExpression' will be parsed out in 'parsePrimaryExpression'
            if (this.flags & 1 /* LineTerminator */)
                { return id; }
            return this.parseFunctionExpression(context & ~16 /* Yield */ | 32 /* Await */, pos);
        // 'AsyncArrowFunction[In, Yield, Await]'
        case 282730 /* YieldKeyword */:
        case 262145 /* Identifier */:
            // The specs says "async[no LineTerminator here]", so just return an plain identifier in case
            // we got an LineTerminator. The 'ArrowFunctionExpression' will be parsed out in 'parseAssignmentExpression'
            if (this.flags & 1 /* LineTerminator */)
                { return id; }
            var expr = this.parseIdentifier(context);
            if (this.token === 10 /* Arrow */)
                { return this.parseArrowFunction(context & ~16 /* Yield */ | 4 /* AllowIn */ | 32 /* Await */, pos, [expr]); }
            // Invalid: 'async abc'
            this.throwUnexpectedToken();
        // CoverCallExpressionAndAsyncArrowHead[Yield, Await]:
        case 262155 /* LeftParen */:
            // This could be either a CallExpression or the head of an async arrow function
            return this.parseAsyncArguments(context | 4 /* AllowIn */, pos, id, flags, isEscaped);
        default:
            // Async as Identifier
            return id;
    }
};
Parser.prototype.parseAsyncArguments = function parseAsyncArguments (context, pos, id, flags, isEscaped) {
        var this$1 = this;

    // Modified ArgumentList production to deal with async stuff. This so we can
    // speed up the "normal" CallExpression production. This also deal with the
    // CoverCallExpressionAndAsyncArrowHead production directly
    // J.K. Thomas
    this.expect(context, 262155 /* LeftParen */);
    var args = [];
    var state = 0;
    while (this.token !== 16 /* RightParen */) {
        if (this$1.token === 14 /* Ellipsis */) {
            var elem = this$1.parseSpreadElement(context);
            // Trailing comma in async arrow param list
            if (this$1.token !== 16 /* RightParen */) {
                state |= 8 /* Trailing */;
                this$1.errorLocation = this$1.errorLocation = this$1.getLocations();
            }
            args.push(elem);
        }
        else {
            if (context & 2 /* Strict */) {
                if (!(state & 1 /* EvalOrArg */) && this$1.isEvalOrArguments(this$1.tokenValue)) {
                    this$1.errorLocation = this$1.errorLocation = this$1.getLocations();
                    state |= 1 /* EvalOrArg */;
                }
            }
            if (!(state & 2 /* Await */) && this$1.token === 331885 /* AwaitKeyword */) {
                this$1.errorLocation = this$1.getLocations();
                state |= 2 /* Await */;
            }
            if (!(state & 4 /* Parenthesized */) && this$1.token === 262155 /* LeftParen */) {
                this$1.errorLocation = this$1.getLocations();
                state |= 4 /* Parenthesized */;
            }
            args.push(this$1.parseAssignmentExpression(context | 256 /* InAsyncParameterList */));
        }
        if (this$1.token === 16 /* RightParen */)
            { break; }
        this$1.expect(context, 18 /* Comma */);
        if (this$1.token === 16 /* RightParen */)
            { break; }
    }
    this.expect(context, 16 /* RightParen */);
    if (this.token === 10 /* Arrow */) {
        if (isEscaped)
            { this.error(68 /* UnexpectedEscapedKeyword */); }
        // async arrows cannot have a line terminator between "async" and the formals
        if (flags & 1 /* LineTerminator */)
            { this.error(67 /* LineBreakAfterAsync */); }
        // Valid: 'async(a=await)=>12'. 
        // Invalid: 'async(await)=>12'. 
        if (this.flags & 512 /* HaveSeenAwait */)
            { this.error(103 /* InvalidAwaitInArrowParam */); }
        if (state & 1 /* EvalOrArg */)
            { this.error(82 /* StrictParamName */); }
        if (state & 4 /* Parenthesized */)
            { this.error(70 /* InvalidParenthesizedPattern */); }
        if (state & 2 /* Await */)
            { this.error(103 /* InvalidAwaitInArrowParam */); }
        if (state & 8 /* Trailing */)
            { this.throwUnexpectedToken(); }
        return this.parseArrowFunction(context & ~16 /* Yield */ | 32 /* Await */, pos, args);
    }
    // We are done, so unset the bitmask
    if (this.flags & 512 /* HaveSeenAwait */)
        { this.flags &= ~512 /* HaveSeenAwait */; }
    this.errorLocation = undefined;
    return this.finishNode(pos, {
        type: 'CallExpression',
        callee: id,
        arguments: args
    });
};
Parser.prototype.parseFunctionBody = function parseFunctionBody (context) {
    var pos = this.getLocations();
    this.expect(context, 393228 /* LeftBrace */);
    var body = [];
    if (this.token !== 15 /* RightBrace */) {
        var previousLabelSet = this.labelSet;
        this.labelSet = undefined;
        var savedFlags = this.flags;
        this.flags |= 4 /* InFunctionBody */;
        this.flags &= ~(64 /* Switch */ | 16 /* Break */ | 32 /* Iteration */);
        body = this.parseStatementList(context & ~12582912 /* Lexical */, 15 /* RightBrace */);
        this.labelSet = previousLabelSet;
        this.flags = savedFlags;
    }
    this.expect(context, 15 /* RightBrace */);
    return this.finishNode(pos, {
        type: 'BlockStatement',
        body: body
    });
};
Parser.prototype.parseSpreadElement = function parseSpreadElement (context) {
    var pos = this.getLocations();
    // Disallow SpreadElement inside dynamic import
    if (context & 16384 /* Import */)
        { this.throwUnexpectedToken(); }
    this.expect(context, 14 /* Ellipsis */);
    var arg = this.parseAssignmentExpression(context);
    return this.finishNode(pos, {
        type: 'SpreadElement',
        argument: arg
    });
};
Parser.prototype.parseArguments = function parseArguments (context, pos) {
        var this$1 = this;

    this.expect(context, 262155 /* LeftParen */);
    var args = [];
    while (this.token !== 16 /* RightParen */) {
        var expr = this$1.token === 14 /* Ellipsis */ ? this$1.parseSpreadElement(context) :
            this$1.parseAssignmentExpression(context);
        args.push(expr);
        if (this$1.token !== 16 /* RightParen */)
            { this$1.expect(context, 18 /* Comma */); }
    }
    this.expect(context, 16 /* RightParen */);
    return args;
};
Parser.prototype.parseMetaProperty = function parseMetaProperty (context, meta, pos) {
    return this.finishNode(pos, {
        meta: meta,
        type: 'MetaProperty',
        property: this.parseIdentifier(context)
    });
};
Parser.prototype.parseNewExpression = function parseNewExpression (context) {
    var pos = this.getLocations();
    if (this.flags & 2 /* HasUnicode */)
        { this.error(68 /* UnexpectedEscapedKeyword */); }
    var id = this.parseIdentifier(context);
    switch (this.token) {
        // '.'
        case 13 /* Period */:
            this.expect(context, 13 /* Period */);
            if (this.token === 262145 /* Identifier */) {
                if (this.tokenValue !== 'target')
                    { this.error(30 /* MetaNotInFunctionBody */); }
                if (context & 128 /* InParameter */)
                    { return this.parseMetaProperty(context, id, pos); }
                if (!(this.flags & 4 /* InFunctionBody */))
                    { this.error(30 /* MetaNotInFunctionBody */); }
            }
            return this.parseMetaProperty(context, id, pos);
        // 'import'
        case 274521 /* ImportKeyword */:
            this.throwUnexpectedToken();
        default:
            return this.finishNode(pos, {
                type: 'NewExpression',
                callee: this.parseMemberExpression(context, pos),
                arguments: this.token === 262155 /* LeftParen */ ? this.parseArguments(context, pos) : []
            });
    }
};
Parser.prototype.parsePrimaryExpression = function parsePrimaryExpression (context, pos) {
    switch (this.token) {
        case 262146 /* NumericLiteral */:
            if (this.flags & 8192 /* BigInt */)
                { return this.parseBigIntLiteral(context); }
        case 262147 /* StringLiteral */:
            return this.parseLiteral(context);
        case 262145 /* Identifier */:
            return this.parseIdentifier(context | 1048576 /* TaggedTemplate */);
        case 274519 /* FunctionKeyword */:
            return this.parseFunctionExpression(context & ~16 /* Yield */ | 64 /* InParenthesis */, pos);
        case 274526 /* ThisKeyword */:
            return this.parseThisExpression(context);
        case 274439 /* NullKeyword */:
            return this.parseNullExpression(context);
        case 274438 /* TrueKeyword */:
        case 274437 /* FalseKeyword */:
            return this.parseTrueOrFalseExpression(context);
        case 262155 /* LeftParen */:
            return this.parseParenthesizedExpression(context | 64 /* InParenthesis */ | 4 /* AllowIn */);
        case 393235 /* LeftBracket */:
            return this.parseArrayInitializer(context);
        case 274522 /* NewKeyword */:
            return this.parseNewExpression(context);
        case 274524 /* SuperKeyword */:
            return this.parseSuper(context);
        case 274509 /* ClassKeyword */:
            return this.parseClassExpression(context);
        case 393228 /* LeftBrace */:
            return this.parseObjectExpression(context);
        case 262153 /* TemplateTail */:
            return this.parseTemplateTail(context, pos);
        case 262152 /* TemplateCont */:
            return this.parseTemplate(context, pos);
        case 2361909 /* Divide */:
        case 1310757 /* DivideAssign */:
            return this.parseRegularExpression(context);
        case 69740 /* AsyncKeyword */:
            return this.parseAsyncFunctionExpression(context, pos);
        case 12369 /* DoKeyword */:
            return this.parseDoExpression(context);
        case 12383 /* ThrowKeyword */:
            return this.parseThrowExpression(context);
        case 331885 /* AwaitKeyword */:
            if (this.flags & 2 /* HasUnicode */)
                { this.error(76 /* UnexpectedReservedWord */); }
            if (context & 32 /* Await */)
                { this.error(83 /* DisallowedInContext */, tokenDesc(this.token)); }
            if (context & 1 /* Module */) {
                // Valid: 'await = 0;'
                if (!this.nextTokenIsAssign(context))
                    { this.throwUnexpectedToken(); }
            }
            return this.parseIdentifier(context);
        case 8671304 /* LetKeyword */:
            if (this.flags & 1 /* LineTerminator */)
                { this.throwUnexpectedToken(); }
        // falls through
        case 2361151 /* LessThan */:
            if (this.flags & 524288 /* OptionsJSX */)
                { return this.parseJSXElement(context | 8192 /* JSXChild */); }
        default:
            if (!this.isIdentifier(context, this.token))
                { this.throwUnexpectedToken(); }
            return this.parseIdentifier(context);
    }
};
Parser.prototype.parseClassDeclaration = function parseClassDeclaration (context) {
    var pos = this.getLocations();
    this.expect(context, 274509 /* ClassKeyword */);
    var superClass = null;
    var id = null;
    var classBody;
    var flags = 0;
    var savedFlags = this.flags;
    if (this.isIdentifier(context, this.token)) {
        var name = this.tokenValue;
        if (context & 1024 /* TopLevel */) {
            if (!this.initBlockScope() && (this.blockScope !== this.functionScope && this.blockScope[name] ||
                this.blockScope[name] === 2 /* NonShadowable */)) {
                this.error(71 /* DuplicateIdentifier */, name);
            }
            this.blockScope[name] = 1 /* Shadowable */;
        }
        id = this.parseBindingIdentifier(context | 2 /* Strict */);
        // Valid: `export default class {};`
        // Invalid: `class {};`
    }
    else if (!(context & 32768 /* OptionalIdentifier */)) {
        this.error(86 /* UnNamedClassStmt */);
    }
    if (this.parseOptional(context, 12372 /* ExtendsKeyword */)) {
        superClass = this.parseLeftHandSideExpression(context & ~32768 /* OptionalIdentifier */ | 2 /* Strict */, pos);
        flags |= 256 /* Heritage */;
    }
    classBody = this.parseClassBody(context | 2 /* Strict */, flags);
    this.flags = savedFlags;
    return this.finishNode(pos, {
        type: 'ClassDeclaration',
        id: id,
        superClass: superClass,
        body: classBody
    });
};
Parser.prototype.parseClassExpression = function parseClassExpression (context) {
    var pos = this.getLocations();
    this.expect(context, 274509 /* ClassKeyword */);
    var superClass = null;
    var classBody;
    var flags = 0;
    var savedFlags = this.flags;
    var id = this.isIdentifier(context, this.token) ? this.parseIdentifier(context | 2 /* Strict */) : null;
    if (this.parseOptional(context, 12372 /* ExtendsKeyword */)) {
        superClass = this.parseLeftHandSideExpression(context | 2 /* Strict */, pos);
        flags |= 256 /* Heritage */;
    }
    classBody = this.parseClassBody(context | 2 /* Strict */, flags);
    this.flags = savedFlags;
    return this.finishNode(pos, {
        type: 'ClassExpression',
        id: id,
        superClass: superClass,
        body: classBody
    });
};
Parser.prototype.parseClassBody = function parseClassBody (context, flags) {
        var this$1 = this;

    var pos = this.getLocations();
    this.expect(context, 393228 /* LeftBrace */);
    var body = [];
    while (this.token !== 15 /* RightBrace */) {
        if (!this$1.parseOptional(context, 17 /* Semicolon */)) {
            var node = this$1.parseClassElement(context, flags);
            body.push(node);
            if (node.kind === 'constructor')
                { context |= 131072 /* HasConstructor */; }
        }
    }
    this.expect(context, 15 /* RightBrace */);
    return this.finishNode(pos, {
        type: 'ClassBody',
        body: body
    });
};
Parser.prototype.parseClassElement = function parseClassElement (context, state) {
    var pos = this.getLocations();
    var key = null;
    var value = null;
    var token = this.token;
    var isEscaped = !!(this.flags & 2 /* HasUnicode */);
    if (this.parseOptional(context, 2099763 /* Multiply */))
        { state |= 1 /* Yield */; }
    if (this.token === 393235 /* LeftBracket */)
        { state |= 4 /* Computed */; }
    if (this.tokenValue === 'constructor')
        { state |= 128 /* HasConstructor */; }
    key = this.parsePropertyName(context & ~2 /* Strict */);
    // cannot use 'await' inside async functions.
    if (context & 32 /* Await */ && this.flags & 4 /* InFunctionBody */ && this.token === 331885 /* AwaitKeyword */) {
        this.error(103 /* InvalidAwaitInArrowParam */);
    }
    if (this.canFollowModifier(context, this.token)) {
        // 'static'
        if (token === 20585 /* StaticKeyword */) {
            if (isEscaped)
                { this.error(68 /* UnexpectedEscapedKeyword */); }
            token = this.token;
            state |= 512 /* Static */;
            if (this.parseOptional(context, 2099763 /* Multiply */)) {
                state |= 1 /* Yield */;
            }
            else {
                if (token === 393235 /* LeftBracket */)
                    { state |= 4 /* Computed */; }
                key = this.parsePropertyName(context);
            }
        }
        if (token === 69740 /* AsyncKeyword */) {
            if (this.token !== 21 /* Colon */ && this.token !== 262155 /* LeftParen */) {
                state |= 2 /* Async */;
                token = this.token;
                if (!(this.flags & 2097152 /* OptionsNext */) && this.token === 2099763 /* Multiply */) {
                    this.error(99 /* InvalidAsyncGenerator */);
                }
                // Async generator
                if (this.parseOptional(context, 2099763 /* Multiply */))
                    { state |= 1 /* Yield */; }
                // Invalid: `class X { async static f() {} }`
                if (this.token === 20585 /* StaticKeyword */)
                    { this.error(101 /* InvalidMethod */); }
                key = this.parsePropertyName(context);
                if (token === 69742 /* ConstructorKeyword */)
                    { this.error(63 /* ConstructorIsAsync */); }
            }
        }
    }
    // MethodDeclaration
    if (this.canFollowModifier(context, this.token)) {
        // should fail on escape sequences in contextual keywords.
        if (isEscaped)
            { this.error(68 /* UnexpectedEscapedKeyword */); }
        switch (token) {
            case 69743 /* GetKeyword */:
                state |= 16 /* Get */;
                break;
            case 69744 /* SetKeyword */:
                state |= 32 /* Set */;
                break;
            case 2099763 /* Multiply */:
                state |= 64 /* Method */;
                break;
        }
        if (state & 2 /* Async */ && state & 48 /* Accessors */) {
            this.error(1 /* UnexpectedToken */, tokenDesc(token));
        }
        switch (this.token) {
            // '['
            case 393235 /* LeftBracket */:
                state |= 4 /* Computed */;
                break;
            // 'constructor'
            case 69742 /* ConstructorKeyword */:
                state |= 128 /* HasConstructor */;
                break;
            default: // ignore
        }
        key = this.parsePropertyName(context);
        value = this.parseMethodDefinition(context | 65536 /* Method */, state);
    }
    if (!(state & 113 /* Modifiers */) || (key && this.token === 262155 /* LeftParen */)) {
        if (state & 256 /* Heritage */ && state & 128 /* HasConstructor */)
            { context |= 262144 /* Constructor */; }
        value = this.parseMethodDefinition(context | 65536 /* Method */, state);
        state |= 64 /* Method */;
    }
    // Invalid: `class Foo { * }`
    if (state & 1 /* Yield */ && !key)
        { this.error(0 /* Unexpected */); }
    if (state & 128 /* HasConstructor */)
        { state |= 1024 /* Special */; }
    if (!(state & 4 /* Computed */)) {
        if (state & 512 /* Static */ && this.tokenValue === 'prototype') {
            this.error(62 /* StaticPrototype */);
        }
        if (!(state & 512 /* Static */) && state & 128 /* HasConstructor */) {
            if (!(state & 1024 /* Special */) || !(state & 64 /* Method */) || (value && value.generator))
                { this.error(59 /* ConstructorSpecialMethod */); }
            if (context & 131072 /* HasConstructor */)
                { this.error(61 /* DuplicateConstructor */); }
            state |= 2048 /* Constructor */;
        }
    }
    return this.finishNode(pos, {
        type: 'MethodDefinition',
        computed: !!(state & 4 /* Computed */),
        key: key,
        kind: (state & 2048 /* Constructor */) ? 'constructor' : (state & 16 /* Get */) ? 'get' :
            (state & 32 /* Set */) ? 'set' : 'method',
        static: !!(state & 512 /* Static */),
        value: value
    });
};
Parser.prototype.canFollowModifier = function canFollowModifier (context, t) {
    switch (t) {
        case 393235 /* LeftBracket */:
        case 2099763 /* Multiply */:
        case 262147 /* StringLiteral */:
        case 262146 /* NumericLiteral */:
        case 393235 /* LeftBracket */:
            return true;
        default:
            return t === 262145 /* Identifier */ || hasMask(t, 4096 /* Keyword */);
    }
};
Parser.prototype.parseObjectExpression = function parseObjectExpression (context) {
        var this$1 = this;

    var pos = this.getLocations();
    this.expect(context, 393228 /* LeftBrace */);
    if (!(this.flags & 16384 /* SimpleParameterList */)) {
        this.flags |= 16384 /* SimpleParameterList */;
    }
    var properties = [];
    var firstProto = undefined;
    while (this.token !== 15 /* RightBrace */) {
        if (this$1.token === 14 /* Ellipsis */) {
            if (!(this$1.flags & 2097152 /* OptionsNext */))
                { this$1.throwUnexpectedToken(); }
            properties.push(this$1.parseSpreadElement(context));
        }
        else {
            this$1.firstProto = firstProto;
            var elem = this$1.parseObjectElement(context);
            if (!firstProto && this$1.firstProto)
                { firstProto = this$1.firstProto; }
            properties.push(elem);
        }
        if (this$1.token !== 15 /* RightBrace */)
            { this$1.expect(context, 18 /* Comma */); }
    }
    this.expect(context, 15 /* RightBrace */);
    return this.finishNode(pos, {
        type: 'ObjectExpression',
        properties: properties
    });
};
Parser.prototype.parseObjectElement = function parseObjectElement (context) {
    var pos = this.getLocations();
    var token = this.token;
    var tokenValue = this.tokenValue;
    var isEscaped = !!(this.flags & 2 /* HasUnicode */);
    var state = 0;
    var firstProto = this.firstProto;
    var key = null;
    var value = null;
    if (this.isIdentifierOrKeyword(token)) {
        this.nextToken(context);
        if (this.canFollowModifier(context, this.token)) {
            // should fail on escape sequences in contextual keywords.
            if (isEscaped)
                { this.error(68 /* UnexpectedEscapedKeyword */); }
            switch (token) {
                case 69740 /* AsyncKeyword */:
                    if (this.flags & 1 /* LineTerminator */)
                        { this.error(67 /* LineBreakAfterAsync */); }
                    // Asynchronous Iteration - Stage 3 proposal
                    if (!(this.flags & 2097152 /* OptionsNext */) && this.token === 2099763 /* Multiply */) {
                        this.error(99 /* InvalidAsyncGenerator */);
                    }
                    if (this.parseOptional(context, 2099763 /* Multiply */))
                        { state |= 1 /* Yield */; }
                    state |= 2 /* Async */ | 64 /* Method */;
                    break;
                case 69743 /* GetKeyword */:
                    state |= 16 /* Get */;
                    break;
                case 69744 /* SetKeyword */:
                    state |= 32 /* Set */;
                    break;
                default: // ignore
            }
            if (this.token === 393235 /* LeftBracket */)
                { state |= 4 /* Computed */; }
            key = this.parsePropertyName(context);
        }
        else {
            key = this.finishNode(pos, {
                type: 'Identifier',
                name: this.tokenValue
            });
        }
    }
    else {
        if (this.parseOptional(context, 2099763 /* Multiply */)) {
            state |= 1 /* Yield */ | 64 /* Method */;
        }
        if (this.token === 393235 /* LeftBracket */) {
            state |= 4 /* Computed */;
        }
        key = this.parsePropertyName(context);
    }
    switch (this.token) {
        case 262155 /* LeftParen */:
            if (!(state & 48 /* Accessors */))
                { state |= 64 /* Method */; }
            value = this.parseMethodDefinition(context | 65536 /* Method */, state);
            break;
        case 21 /* Colon */:
            if (state & 1 /* Yield */)
                { this.error(0 /* Unexpected */); }
            if (!(state & 4 /* Computed */) && this.tokenValue === '__proto__') {
                if (firstProto)
                    { this.error(56 /* DuplicateProtoProperty */); }
                this.firstProto = true;
            }
            this.expect(context, 21 /* Colon */);
            if (context & 256 /* InAsyncParameterList */ && this.token === 331885 /* AwaitKeyword */) {
                this.errorLocation = this.getLocations();
                this.flags |= 512 /* HaveSeenAwait */;
            }
            value = this.parseAssignmentExpression(context);
            if (this.isEvalOrArgumentsIdentifier(context, value.name)) {
                this.error(80 /* UnexpectedStrictReserved */);
            }
            break;
        default:
            if (state & 2 /* Async */ || !this.isIdentifier(context, token)) {
                this.throwUnexpectedToken();
            }
            if (context & 16 /* Yield */ && token === 282730 /* YieldKeyword */) {
                this.error(83 /* DisallowedInContext */, tokenDesc(this.token));
            }
            if (token === 331885 /* AwaitKeyword */) {
                if (context & 32 /* Await */)
                    { this.throwUnexpectedToken(); }
                if (context & 256 /* InAsyncParameterList */) {
                    this.errorLocation = this.getLocations();
                    this.flags |= 512 /* HaveSeenAwait */;
                }
            }
            if (context & (524288 /* ForStatement */ | 64 /* InParenthesis */) &&
                this.isEvalOrArgumentsIdentifier(context, tokenValue)) {
                this.error(76 /* UnexpectedReservedWord */);
            }
            state |= 8 /* Shorthand */;
            if (this.token === 1310749 /* Assign */) {
                value = this.parseAssignmentPattern(context, pos, key);
            }
            else {
                value = key;
            }
    }
    return this.finishNode(pos, {
        type: 'Property',
        key: key,
        value: value,
        kind: !(state & 48 /* Accessors */) ? 'init' : (state & 32 /* Set */) ? 'set' : 'get',
        computed: !!(state & 4 /* Computed */),
        method: !!(state & 64 /* Method */),
        shorthand: !!(state & 8 /* Shorthand */)
    });
};
Parser.prototype.parseMethodDefinition = function parseMethodDefinition (context, state) {
    var pos = this.getLocations();
    { context &= ~(16 /* Yield */ | 32 /* Await */); }
    if (state & 1 /* Yield */ && !(state & 16 /* Get */))
        { context |= 16 /* Yield */; }
    if (state & 2 /* Async */)
        { context |= 32 /* Await */; }
    var savedFlag = this.flags;
    var savedScope = this.enterFunctionScope();
    var params = this.parseParameterList(context | 128 /* InParameter */, state);
    if (state & 32 /* Set */) {
        if (params[0].type === 'RestElement') {
            this.error(25 /* BadSetterRestParameter */);
        }
    }
    var body = this.parseFunctionBody(context);
    this.flags = savedFlag;
    this.exitFunctionScope(savedScope);
    return this.finishNode(pos, {
        type: 'FunctionExpression',
        id: null,
        params: params,
        body: body,
        generator: !!(state & 1 /* Yield */),
        async: !!(state & 2 /* Async */),
        expression: false
    });
};
Parser.prototype.parseRestElement = function parseRestElement (context) {
    var pos = this.getLocations();
    this.expect(context, 14 /* Ellipsis */);
    var argument = this.parseBindingPatternOrIdentifier(context, pos);
    if (this.token === 1310749 /* Assign */)
        { this.throwUnexpectedToken(); }
    if (this.token !== 16 /* RightParen */)
        { this.error(27 /* ParameterAfterRestParameter */); }
    return this.finishNode(pos, {
        type: 'RestElement',
        argument: argument
    });
};
Parser.prototype.parseThrowExpression = function parseThrowExpression (context) {
    if (!(this.flags & 2097152 /* OptionsNext */)) {
        this.error(105 /* UnsupportedFeature */, tokenDesc(this.token), 'next');
    }
    var pos = this.getLocations();
    this.nextToken(context);
    return this.finishNode(pos, {
        type: 'ThrowExpression',
        expressions: this.parseUnaryExpressionFastPath(context)
    });
};
Parser.prototype.parseArrayInitializer = function parseArrayInitializer (context) {
        var this$1 = this;

    var pos = this.getLocations();
    this.expect(context, 393235 /* LeftBracket */);
    var elements = [];
    var state = 0;
    while (this.token !== 20 /* RightBracket */) {
        if (this$1.parseOptional(context, 18 /* Comma */)) {
            elements.push(null);
        }
        else if (this$1.token === 14 /* Ellipsis */) {
            state |= 2 /* Spread */;
            var element = this$1.parseSpreadElement(context);
            if (this$1.token !== 20 /* RightBracket */) {
                this$1.expect(context, 18 /* Comma */);
            }
            elements.push(element);
        }
        else {
            if (this$1.isEvalOrArguments(this$1.tokenValue)) {
                state |= 1 /* EvalArg */;
                this$1.errorLocation = this$1.getLocations();
            }
            // Invalid: 'function* f() { [yield {a = 0}]; }'
            if (context & 16 /* Yield */ && !(context & 65536 /* Method */) && this$1.flags & 4 /* InFunctionBody */ && this$1.token === 282730 /* YieldKeyword */) {
                this$1.error(78 /* InvalidShorthandAssignment */);
            }
            elements.push(this$1.parseAssignmentExpression(context | 4 /* AllowIn */));
            if (this$1.token !== 20 /* RightBracket */) {
                this$1.expect(context, 18 /* Comma */);
            }
        }
    }
    this.expect(context, 20 /* RightBracket */);
    if (this.token === 1310749 /* Assign */) {
        if (state & 1 /* EvalArg */)
            { this.error(82 /* StrictParamName */); }
    }
    return this.finishNode(pos, {
        type: 'ArrayExpression',
        elements: elements
    });
};
// ParenthesizedExpression[Yield, Await]:
// CoverParenthesizedExpressionAndArrowParameterList[Yield, Await]:
Parser.prototype.parseParenthesizedExpression = function parseParenthesizedExpression (context) {
        var this$1 = this;

    var pos = this.getLocations();
    this.expect(context, 262155 /* LeftParen */);
    if (context & 524288 /* ForStatement */) {
        if (hasMask(this.token, 131072 /* BindingPattern */))
            { this.error(33 /* InvalidLHSInForLoop */); }
        context & ~524288 /* ForStatement */;
    }
    var state = 0;
    if (this.parseOptional(context, 16 /* RightParen */)) {
        if (this.token === 10 /* Arrow */) {
            return this.parseArrowFunction(context & ~(32 /* Await */ | 16 /* Yield */), pos, []);
        }
        this.error(69 /* MissingArrowAfterParentheses */);
    }
    // Create a lexical scope node around the whole ForStatement
    var blockScope = this.blockScope;
    var parentScope = this.parentScope;
    if (blockScope !== undefined)
        { this.parentScope = blockScope; }
    this.blockScope = undefined;
    var expr;
    if (this.token === 14 /* Ellipsis */) {
        expr = this.parseRestElement(context);
        this.expect(context, 16 /* RightParen */);
        return this.parseArrowFunction(context & ~(32 /* Await */ | 16 /* Yield */), pos, [expr]);
    }
    var sequencePos = this.getLocations();
    if (context & 2 /* Strict */) {
        if (!(state & 1 /* EvalOrArg */) && this.isEvalOrArguments(this.tokenValue)) {
            state |= 1 /* EvalOrArg */;
        }
    }
    if (!(state & 4 /* Parenthesized */) && this.token === 262155 /* LeftParen */) {
        state |= 4 /* Parenthesized */;
    }
    if (!(state & 16 /* Pattern */) && hasMask(this.token, 131072 /* BindingPattern */)) {
        this.errorLocation = sequencePos;
        state |= 16 /* Pattern */;
    }
    expr = this.parseAssignmentExpression(context);
    if (this.token === 18 /* Comma */) {
        var expressions = [expr];
        while (this.parseOptional(context, 18 /* Comma */)) {
            if (this$1.parseOptional(context, 16 /* RightParen */)) {
                return this$1.parseArrowFunction(context & ~(32 /* Await */ | 16 /* Yield */), pos, expressions);
            }
            else if (this$1.token === 14 /* Ellipsis */) {
                expressions.push(this$1.parseRestElement(context));
                this$1.expect(context, 16 /* RightParen */);
                return this$1.parseArrowFunction(context & ~(32 /* Await */ | 16 /* Yield */), pos, expressions);
            }
            else {
                if (context & 2 /* Strict */) {
                    var errPos = this$1.getLocations();
                    if (!(state & 1 /* EvalOrArg */) && this$1.isEvalOrArguments(this$1.tokenValue)) {
                        this$1.errorLocation = errPos;
                        state |= 1 /* EvalOrArg */;
                    }
                }
                if (!(state & 4 /* Parenthesized */) && this$1.token === 262155 /* LeftParen */) {
                    this$1.errorLocation = this$1.getLocations();
                    state |= 4 /* Parenthesized */;
                }
                expressions.push(this$1.parseAssignmentExpression(context));
            }
        }
        expr = this.finishNode(sequencePos, {
            type: 'SequenceExpression',
            expressions: expressions
        });
    }
    if (!(this.flags & 8 /* AllowCall */))
        { this.flags |= 8 /* AllowCall */; }
    this.expect(context, 16 /* RightParen */);
    this.blockScope = blockScope;
    if (blockScope !== undefined)
        { this.parentScope = parentScope; }
    if (this.token === 10 /* Arrow */) {
        if (this.flags & 256 /* HaveSeenYield */)
            { this.error(102 /* InvalidArrowYieldParam */); }
        if (state & 1 /* EvalOrArg */)
            { this.error(82 /* StrictParamName */); }
        if (state & 4 /* Parenthesized */)
            { this.error(70 /* InvalidParenthesizedPattern */); }
        return this.parseArrowFunction(context, pos, expr.type === 'SequenceExpression' ? expr.expressions : [expr]);
    }
    this.errorLocation = undefined;
    if (state & 16 /* Pattern */) {
        this.flags |= 32768 /* ParenthesizedPattern */;
    }
    return expr;
};
Parser.prototype.parseRegularExpression = function parseRegularExpression (context) {
    this.scanRegularExpression();
    var pos = this.getLocations();
    var regex = this.tokenRegExp;
    var value = this.tokenValue;
    var raw = this.tokenRaw;
    this.nextToken(context);
    var node = this.finishNode(pos, {
        type: 'Literal',
        value: value,
        regex: regex
    });
    if (this.flags & 1048576 /* OptionsRaw */)
        { node.raw = raw; }
    return node;
};
Parser.prototype.parseTemplateTail = function parseTemplateTail (context, pos) {
    return this.finishNode(pos, {
        type: 'TemplateLiteral',
        expressions: [],
        quasis: [this.parseTemplateElement(context)]
    });
};
Parser.prototype.parseTemplateHead = function parseTemplateHead (context, cooked, raw) {
    var pos = this.getLocations();
    this.token = this.scanTemplateNext(context);
    return this.finishNode(pos, {
        type: 'TemplateElement',
        value: {
            cooked: cooked,
            raw: raw
        },
        tail: false
    });
};
Parser.prototype.parseTemplateElement = function parseTemplateElement (context) {
    var pos = this.getLocations();
    var cooked = this.tokenValue;
    var raw = this.tokenRaw;
    this.expect(context, 262153 /* TemplateTail */);
    return this.finishNode(pos, {
        type: 'TemplateElement',
        value: {
            cooked: cooked,
            raw: raw
        },
        tail: true
    });
};
Parser.prototype.parseTaggedTemplateExpression = function parseTaggedTemplateExpression (context, expr, quasi, pos) {
    return this.finishNode(pos, {
        type: 'TaggedTemplateExpression',
        tag: expr,
        quasi: quasi
    });
};
Parser.prototype.parseTemplate = function parseTemplate (context, pos) {
        var this$1 = this;

    var expressions = [];
    var quasis = [];
    while (this.token === 262152 /* TemplateCont */) {
        if (this$1.token === 15 /* RightBrace */) {
            this$1.throwUnexpectedToken();
        }
        var cooked = this$1.tokenValue;
        var raw = this$1.tokenRaw;
        this$1.expect(context, 262152 /* TemplateCont */);
        // Note: A TemplateSpan should always be followed by an Expression, while a
        // 'TemplateTail' terminates a TemplateLiteral and does not need to be
        // followed by an Expression.
        expressions.push(this$1.parseExpression(context, pos));
        quasis.push(this$1.parseTemplateHead(context, cooked, raw));
    }
    while (this.token === 262153 /* TemplateTail */) {
        quasis.push(this$1.parseTemplateElement(context));
    }
    return this.finishNode(pos, {
        type: 'TemplateLiteral',
        expressions: expressions,
        quasis: quasis
    });
};
Parser.prototype.parseBigIntLiteral = function parseBigIntLiteral (context) {
    var pos = this.getLocations();
    var value = this.tokenValue;
    var raw = this.tokenRaw;
    this.nextToken(context);
    var node = this.finishNode(pos, {
        type: 'Literal',
        value: value,
        bigint: raw
    });
    if (this.flags & 1048576 /* OptionsRaw */)
        { node.raw = raw; }
    return node;
};
Parser.prototype.parseLiteral = function parseLiteral (context) {
    var pos = this.getLocations();
    var value = this.tokenValue;
    var raw = this.tokenRaw;
    if (value === 'use strict' && !(this.flags & (2 /* HasUnicode */ | 2048 /* HasStrictDirective */))) {
        this.flags |= 2048 /* HasStrictDirective */;
    }
    if (context & 2 /* Strict */ && this.flags & 4096 /* Noctal */)
        { this.error(0 /* Unexpected */); }
    this.nextToken(context);
    var node = this.finishNode(pos, {
        type: 'Literal',
        value: value
    });
    if (this.flags & 1048576 /* OptionsRaw */)
        { node.raw = raw; }
    return node;
};
Parser.prototype.parseTrueOrFalseExpression = function parseTrueOrFalseExpression (context) {
    var pos = this.getLocations();
    var value = this.tokenValue === 'true';
    var raw = this.tokenValue;
    if (this.flags & 2 /* HasUnicode */)
        { this.error(68 /* UnexpectedEscapedKeyword */); }
    this.nextToken(context);
    var node = this.finishNode(pos, {
        type: 'Literal',
        value: value
    });
    if (this.flags & 1048576 /* OptionsRaw */)
        { node.raw = raw; }
    return node;
};
Parser.prototype.parseThisExpression = function parseThisExpression (context) {
    var pos = this.getLocations();
    this.nextToken(context);
    return this.finishNode(pos, {
        type: 'ThisExpression'
    });
};
Parser.prototype.parseNullExpression = function parseNullExpression (context) {
    var pos = this.getLocations();
    if (this.flags & 2 /* HasUnicode */)
        { this.error(68 /* UnexpectedEscapedKeyword */); }
    this.nextToken(context);
    var node = this.finishNode(pos, {
        type: 'Literal',
        value: null
    });
    if (this.flags & 1048576 /* OptionsRaw */)
        { node.raw = 'null'; }
    return node;
};
Parser.prototype.parseIdentifier = function parseIdentifier (context) {
    var name = this.tokenValue;
    var pos = this.getLocations();
    this.nextToken(context);
    return this.finishNode(pos, {
        type: 'Identifier',
        name: name
    });
};
/****
 * Label
 */
Parser.prototype.validateLabel = function validateLabel (name) {
    if (this.labelSet === undefined || !('@' + name in this.labelSet)) {
        this.error(74 /* UnknownLabel */, name);
    }
};
/****
 * Scope
 */
// Fast path for catch arguments
Parser.prototype.addCatchArg = function addCatchArg (name, type /* Shadowable */) {
        if ( type === void 0 ) type = 1;

    this.initBlockScope();
    this.blockScope[name] = type;
};
Parser.prototype.initBlockScope = function initBlockScope () {
    if (this.functionScope == null) {
        this.functionScope = Object.create(null);
        this.blockScope = Object.create(this.functionScope);
        this.parentScope = this.blockScope;
    }
    else if (this.blockScope == null) {
        this.blockScope = Object.create(this.parentScope);
        this.parentScope = this.blockScope;
    }
    else {
        return false;
    }
    return true;
};
Parser.prototype.initFunctionScope = function initFunctionScope () {
    if (this.functionScope !== undefined)
        { return false; }
    this.functionScope = Object.create(null);
    this.blockScope = this.functionScope;
    this.parentScope = this.functionScope;
    return true;
};
Parser.prototype.addFunctionArg = function addFunctionArg (name) {
    if (!this.initFunctionScope() && name in this.functionScope)
        { this.error(71 /* DuplicateIdentifier */, name); }
    this.functionScope[name] = 1 /* Shadowable */;
};
Parser.prototype.addVarOrBlock = function addVarOrBlock (context, name) {
    if (context & 12582912 /* Lexical */) {
        this.addBlockName(name);
    }
    else {
        this.addVarName(name);
    }
};
Parser.prototype.addVarName = function addVarName (name) {
    if (!this.initFunctionScope() && this.blockScope !== undefined &&
        this.blockScope[name] === 2 /* NonShadowable */) {
        this.error(71 /* DuplicateIdentifier */, name);
    }
    this.functionScope[name] = 1 /* Shadowable */;
};
Parser.prototype.addBlockName = function addBlockName (name) {
    switch (name) {
        case 'Infinity':
        case 'NaN':
        case 'Number':
        case 'String':
        case 'undefined':
            this.error(71 /* DuplicateIdentifier */, name);
        default: // ignore
    }
    if (!this.initBlockScope() && (
    // Check `var` variables
    this.blockScope[name] === 1 /* Shadowable */ ||
        // Check variables in current block only
        hasOwn.call(this.blockScope, name))) {
        this.error(71 /* DuplicateIdentifier */, name);
    }
    this.blockScope[name] = 2 /* NonShadowable */;
};
Parser.prototype.enterFunctionScope = function enterFunctionScope () {
    var functionScope = this.functionScope;
    var blockScope = this.blockScope;
    var parentScope = this.parentScope;
    this.functionScope = undefined;
    this.blockScope = undefined;
    this.parentScope = undefined;
    return {
        functionScope: functionScope,
        blockScope: blockScope,
        parentScope: parentScope
    };
};
Parser.prototype.exitFunctionScope = function exitFunctionScope (t) {
    this.functionScope = t.functionScope;
    this.blockScope = t.blockScope;
    this.parentScope = t.parentScope;
};
/****
 * Pattern
 */
Parser.prototype.parseAssignmentPattern = function parseAssignmentPattern (context, pos, pattern) {
        if ( pos === void 0 ) pos = this.getLocations();
        if ( pattern === void 0 ) pattern = this.parseBindingPatternOrIdentifier(context, pos);

    if (!this.parseOptional(context, 1310749 /* Assign */))
        { return pattern; }
    if (context & 128 /* InParameter */ && context & 16 /* Yield */ && this.token === 282730 /* YieldKeyword */)
        { this.error(0 /* Unexpected */); }
    var right = this.parseAssignmentExpression(context);
    return this.finishNode(pos, {
        type: 'AssignmentPattern',
        left: pattern,
        right: right
    });
};
Parser.prototype.parseBindingPatternOrIdentifier = function parseBindingPatternOrIdentifier (context, pos) {
    switch (this.token) {
        case 393235 /* LeftBracket */:
            return this.parseAssignmentElementList(context);
        case 393228 /* LeftBrace */:
            return this.ObjectAssignmentPattern(context, pos);
        case 282730 /* YieldKeyword */:
            if (context & 16 /* Yield */) {
                this.error(83 /* DisallowedInContext */, tokenDesc(this.token));
            }
            if (context & 2 /* Strict */) {
                if (this.flags & 2 /* HasUnicode */)
                    { this.error(68 /* UnexpectedEscapedKeyword */); }
                this.error(83 /* DisallowedInContext */, tokenDesc(this.token));
            }
        case 331885 /* AwaitKeyword */:
            if (context & (1 /* Module */ | 32 /* Await */))
                { this.throwUnexpectedToken(); }
            return this.parseBindingIdentifier(context);
        case 8671304 /* LetKeyword */:
            if (context & 2 /* Strict */ && this.flags & 2 /* HasUnicode */) {
                this.error(68 /* UnexpectedEscapedKeyword */);
            }
            if (context & 12582912 /* Lexical */)
                { this.error(54 /* LetInLexicalBinding */); }
        default:
            if (!this.isIdentifier(context, this.token))
                { this.throwUnexpectedToken(); }
            return this.parseBindingIdentifier(context);
    }
};
Parser.prototype.parseBindingIdentifier = function parseBindingIdentifier (context) {
    var pos = this.getLocations();
    var name = this.tokenValue;
    if (this.isEvalOrArguments(name)) {
        if (context & 2 /* Strict */)
            { this.error(35 /* StrictLHSAssignment */); }
        if (context & 128 /* InParameter */) {
            this.errorLocation = this.getLocations();
            this.flags |= 1024 /* BindingPosition */;
        }
    }
    if (context & 128 /* InParameter */ || context & 64 /* InParenthesis */) {
        // In a parameter list, we only check for duplicate params
        // if inside a strict, method or await context
        if (context & (2 /* Strict */ | 32 /* Await */) && !(context & 65536 /* Method */)) {
            this.addFunctionArg(name);
        }
    }
    else {
        this.addVarOrBlock(context, name);
    }
    this.nextToken(context);
    return this.finishNode(pos, {
        type: 'Identifier',
        name: name
    });
};
Parser.prototype.parseAssignmentRestElement = function parseAssignmentRestElement (context) {
    var pos = this.getLocations();
    this.expect(context, 14 /* Ellipsis */);
    var argument = this.parseBindingPatternOrIdentifier(context, pos);
    if (this.token === 1310749 /* Assign */)
        { this.throwUnexpectedToken(); }
    return this.finishNode(pos, {
        type: 'RestElement',
        argument: argument
    });
};
/**
 * ArrayAssignmentPattern[Yield] :
 *   [ Elisionopt AssignmentRestElement[?Yield]opt ]
 *   [ AssignmentElementList[?Yield] ]
 *   [ AssignmentElementList[?Yield] , Elisionopt AssignmentRestElement[?Yield]opt ]
 *
 * AssignmentRestElement[Yield] :
 *   ... DestructuringAssignmentTarget[?Yield]
 *
 * AssignmentElementList[Yield] :
 *   AssignmentElisionElement[?Yield]
 *   AssignmentElementList[?Yield] , AssignmentElisionElement[?Yield]
 *
 * AssignmentElisionElement[Yield] :
 *   Elisionopt AssignmentElement[?Yield]
 *
 * AssignmentElement[Yield] :
 *   DestructuringAssignmentTarget[?Yield] Initializer[In,?Yield]opt
 *
 * DestructuringAssignmentTarget[Yield] :
 *   LeftHandSideExpression[?Yield]
 */
Parser.prototype.parseAssignmentElementList = function parseAssignmentElementList (context) {
        var this$1 = this;

    var pos = this.getLocations();
    this.expect(context, 393235 /* LeftBracket */);
    var elements = [];
    while (this.token !== 20 /* RightBracket */) {
        if (this$1.parseOptional(context, 18 /* Comma */)) {
            elements.push(null);
        }
        else {
            if (this$1.token === 14 /* Ellipsis */) {
                elements.push(this$1.parseAssignmentRestElement(context));
                break;
            }
            elements.push(this$1.parseAssignmentPattern(context | 4 /* AllowIn */));
            if (this$1.token !== 20 /* RightBracket */)
                { this$1.expect(context, 18 /* Comma */); }
        }
    }
    this.expect(context, 20 /* RightBracket */);
    return this.finishNode(pos, {
        type: 'ArrayPattern',
        elements: elements
    });
};
Parser.prototype.parsePropertyName = function parsePropertyName (context) {
    switch (this.token) {
        case 262147 /* StringLiteral */:
        case 262146 /* NumericLiteral */:
            return this.parseLiteral(context);
        case 393235 /* LeftBracket */:
            return this.parseComputedPropertyName(context);
        default:
            return this.parseIdentifier(context);
    }
};
Parser.prototype.parseComputedPropertyName = function parseComputedPropertyName (context) {
    this.expect(context, 393235 /* LeftBracket */);
    var expression = this.parseAssignmentExpression(context | 4 /* AllowIn */);
    this.expect(context, 20 /* RightBracket */);
    return expression;
};
Parser.prototype.ObjectAssignmentPattern = function ObjectAssignmentPattern (context, pos) {
        var this$1 = this;

    var properties = [];
    this.expect(context, 393228 /* LeftBrace */);
    while (this.token !== 15 /* RightBrace */) {
        if (this$1.token === 14 /* Ellipsis */) {
            if (!(this$1.flags & 2097152 /* OptionsNext */))
                { this$1.throwUnexpectedToken(); }
            properties.push(this$1.parseRestProperty(context));
        }
        else {
            properties.push(this$1.parseAssignmentProperty(context));
        }
        if (this$1.token !== 15 /* RightBrace */)
            { this$1.parseOptional(context, 18 /* Comma */); }
    }
    this.expect(context, 15 /* RightBrace */);
    return this.finishNode(pos, {
        type: 'ObjectPattern',
        properties: properties
    });
};
Parser.prototype.parseRestProperty = function parseRestProperty (context) {
    var pos = this.getLocations();
    this.expect(context, 14 /* Ellipsis */);
    if (this.token !== 262145 /* Identifier */)
        { this.throwUnexpectedToken(); }
    var arg = this.parseBindingPatternOrIdentifier(context, pos);
    if (this.token === 1310749 /* Assign */)
        { this.throwUnexpectedToken(); }
    return this.finishNode(pos, {
        type: 'RestElement',
        argument: arg
    });
};
Parser.prototype.parseAssignmentProperty = function parseAssignmentProperty (context) {
    var pos = this.getLocations();
    var state = 0;
    var key;
    var value;
    if (this.isIdentifier(context, this.token)) {
        pos = this.getLocations();
        var token = this.token;
        var tokenValue = this.tokenValue;
        key = this.parsePropertyName(context);
        var init = this.finishNode(pos, {
            type: 'Identifier',
            name: tokenValue
        });
        if (this.parseOptional(context, 21 /* Colon */)) {
            value = this.parseAssignmentPattern(context);
        }
        else {
            state |= 8 /* Shorthand */;
            if (context & 16 /* Yield */ && token === 282730 /* YieldKeyword */) {
                this.error(83 /* DisallowedInContext */, tokenDesc(token));
            }
            if (this.token === 1310749 /* Assign */) {
                value = this.parseAssignmentPattern(context, pos, init);
            }
            else {
                value = init;
            }
        }
    }
    else {
        if (this.token === 393235 /* LeftBracket */)
            { state |= 4 /* Computed */; }
        key = this.parsePropertyName(context);
        this.expect(context, 21 /* Colon */);
        value = this.parseAssignmentPattern(context);
    }
    return this.finishNode(pos, {
        type: 'Property',
        kind: 'init',
        key: key,
        computed: !!(state & 4 /* Computed */),
        value: value,
        method: false,
        shorthand: !!(state & 8 /* Shorthand */)
    });
};
/** V8 */
Parser.prototype.parseDoExpression = function parseDoExpression (context) {
    if (!(this.flags & 33554432 /* OptionsV8 */)) {
        this.error(105 /* UnsupportedFeature */, tokenDesc(this.token), 'v8');
    }
    var pos = this.getLocations();
    this.expect(context, 12369 /* DoKeyword */);
    var body = this.parseBlockStatement(context);
    return this.finishNode(pos, {
        type: 'DoExpression',
        body: body
    });
};
/** JSX */
Parser.prototype.parseJSXChildren = function parseJSXChildren (context) {
        var this$1 = this;

    var children = [];
    while (this.token !== 25 /* JSXClose */) {
        children.push(this$1.parseJSXChild(context | 8192 /* JSXChild */, this$1.getLocations()));
    }
    return children;
};
Parser.prototype.parseJSXChild = function parseJSXChild (context, pos) {
    switch (this.token) {
        case 116 /* JSXText */:
        case 262145 /* Identifier */:
            return this.parseJSXText(context);
        case 393228 /* LeftBrace */:
            return this.parseJSXExpressionContainer(context, pos);
        case 2361151 /* LessThan */:
            return this.parseJSXElement(context & ~8192 /* JSXChild */);
        default: // ignore
    }
};
Parser.prototype.parseJSXSpreadChild = function parseJSXSpreadChild (context) {
    var pos = this.getLocations();
    this.expect(context, 14 /* Ellipsis */);
    var expression = this.parseExpression(context, pos);
    this.expect(context, 15 /* RightBrace */);
    return this.finishNode(pos, {
        type: 'JSXSpreadChild',
        expression: expression
    });
};
Parser.prototype.parseJSXText = function parseJSXText (context) {
    var pos = this.getLocations();
    var value = this.source.slice(this.startIndex, this.index);
    this.nextJSXToken();
    var node = this.finishNode(pos, {
        type: 'JSXText',
        value: value
    });
    if (this.flags & 1048576 /* OptionsRaw */)
        { node.raw = value; }
    return node;
};
Parser.prototype.parseJSXEmptyExpression = function parseJSXEmptyExpression (pos) {
    return this.finishNode(pos, {
        type: 'JSXEmptyExpression'
    });
};
Parser.prototype.parseJSXExpressionContainer = function parseJSXExpressionContainer (context, pos) {
    this.expect(context, 393228 /* LeftBrace */);
    if (this.token === 14 /* Ellipsis */) {
        return this.parseJSXSpreadChild(context);
    }
    var expression = this.token === 15 /* RightBrace */ ?
        this.parseJSXEmptyExpression(pos) :
        this.parseAssignmentExpression(context);
    this.nextJSXToken();
    return this.finishNode(pos, {
        type: 'JSXExpressionContainer',
        expression: expression
    });
};
Parser.prototype.parseJSXClosingFragment = function parseJSXClosingFragment (context) {
    var pos = this.getLocations();
    this.expect(context, 25 /* JSXClose */);
    this.expect(context, 2099008 /* GreaterThan */);
    return this.finishNode(pos, {
        type: 'JSXClosingFragment'
    });
};
Parser.prototype.parseJSXElement = function parseJSXElement (context) {
    var pos = this.getLocations();
    var openingElement = this.parseJSXOpeningElement(context);
    var children = [];
    var closingElement = null;
    if (openingElement.type === 'JSXOpeningFragment') {
        children = this.parseJSXChildren(context);
        closingElement = this.parseJSXClosingFragment(context);
        return this.finishNode(pos, {
            type: 'JSXFragment',
            children: children,
            openingElement: openingElement,
            closingElement: closingElement,
        });
    }
    if (!openingElement.selfClosing) {
        children = this.parseJSXChildren(context);
        closingElement = this.parseJSXClosingElement(context);
        var open = isQualifiedJSXName(openingElement.name);
        var close = isQualifiedJSXName(closingElement.name);
        if (open !== close)
            { this.error(41 /* ExpectedJSXClosingTag */, close); }
    }
    return this.finishNode(pos, {
        type: 'JSXElement',
        children: children,
        openingElement: openingElement,
        closingElement: closingElement,
    });
};
Parser.prototype.parseJSXOpeningElement = function parseJSXOpeningElement (context) {
    var pos = this.getLocations();
    this.expect(context, 2361151 /* LessThan */);
    if (this.token === 2099008 /* GreaterThan */) {
        this.nextJSXToken();
        return this.finishNode(pos, {
            type: 'JSXOpeningFragment'
        });
    }
    var tagName = this.parseJSXElementName(context);
    var attributes = this.parseJSXAttributes(context);
    var selfClosing = this.token === 2361909;
    if (this.token === 2099008 /* GreaterThan */) {
        this.nextJSXToken();
    }
    else {
        this.expect(context, 2361909 /* Divide */);
        if (context & 8192 /* JSXChild */) {
            this.expect(context, 2099008 /* GreaterThan */);
        }
        else {
            this.nextJSXToken();
        }
    }
    return this.finishNode(pos, {
        type: 'JSXOpeningElement',
        name: tagName,
        attributes: attributes,
        selfClosing: selfClosing
    });
};
Parser.prototype.parseJSXClosingElement = function parseJSXClosingElement (context) {
    var pos = this.getLocations();
    this.expect(context, 25 /* JSXClose */);
    var name = this.parseJSXElementName(context);
    if (context & 8192 /* JSXChild */) {
        this.expect(context, 2099008 /* GreaterThan */);
    }
    else {
        this.nextJSXToken();
    }
    return this.finishNode(pos, {
        type: 'JSXClosingElement',
        name: name
    });
};
Parser.prototype.scanJSXString = function scanJSXString () {
        var this$1 = this;

    var rawStart = this.index;
    var quote = this.nextChar();
    this.advance();
    var ret = '';
    var start = this.index;
    var ch;
    while (ch !== quote) {
        this$1.advance();
        ch = this$1.nextChar();
    }
    // check for unterminated string
    if (ch !== quote)
        { this.error(3 /* UnterminatedString */); }
    if (start !== this.index)
        { ret += this.source.slice(start, this.index); }
    this.advance(); // skip the quote
    this.tokenValue = ret;
    // raw
    if (this.flags & 1048576 /* OptionsRaw */)
        { this.storeRaw(rawStart); }
    return 262147 /* StringLiteral */;
};
Parser.prototype.scanJSXAttributeValue = function scanJSXAttributeValue (context) {
    this.startIndex = this.index;
    this.startColumn = this.column;
    this.startLine = this.line;
    switch (this.nextChar()) {
        case 34 /* DoubleQuote */:
        case 39 /* SingleQuote */:
            return this.scanJSXString();
        default:
            this.nextToken(context);
    }
};
Parser.prototype.parseJSXSpreadAttribute = function parseJSXSpreadAttribute (context) {
    var pos = this.getLocations();
    this.expect(context, 393228 /* LeftBrace */);
    this.expect(context, 14 /* Ellipsis */);
    var expression = this.parseExpression(context, pos);
    this.expect(context, 15 /* RightBrace */);
    return this.finishNode(pos, {
        type: 'JSXSpreadAttribute',
        argument: expression
    });
};
Parser.prototype.parseJSXAttributeName = function parseJSXAttributeName (context) {
    var pos = this.getLocations();
    var identifier = this.parseJSXIdentifier(context);
    if (this.token !== 21 /* Colon */)
        { return identifier; }
    return this.parseJSXNamespacedName(context, identifier, pos);
};
Parser.prototype.parseJSXAttribute = function parseJSXAttribute (context) {
    var pos = this.getLocations();
    var value = null;
    var attrName = this.parseJSXAttributeName(context);
    switch (this.token) {
        case 1310749 /* Assign */:
            switch (this.scanJSXAttributeValue(context)) {
                case 262147 /* StringLiteral */:
                    value = this.parseLiteral(context);
                    break;
                default:
                    value = this.parseJSXExpressionAttribute(context);
            }
        default: // ignore
    }
    return this.finishNode(pos, {
        type: 'JSXAttribute',
        value: value,
        name: attrName
    });
};
Parser.prototype.parseJSXExpressionAttribute = function parseJSXExpressionAttribute (context) {
    var pos = this.getLocations();
    this.expect(context, 393228 /* LeftBrace */);
    if (this.token === 14 /* Ellipsis */)
        { return this.parseJSXSpreadChild(context); }
    var expression = this.parseAssignmentExpression(context);
    this.expect(context, 15 /* RightBrace */);
    return this.finishNode(pos, {
        type: 'JSXExpressionContainer',
        expression: expression
    });
};
Parser.prototype.parseJSXAttributes = function parseJSXAttributes (context) {
        var this$1 = this;

    var attributes = [];
    loop: while (this.hasNext()) {
        switch (this$1.token) {
            case 2361909 /* Divide */:
            case 2099008 /* GreaterThan */:
                break loop;
            case 393228 /* LeftBrace */:
                attributes.push(this$1.parseJSXSpreadAttribute(context &= ~8192 /* JSXChild */));
                break;
            default:
                attributes.push(this$1.parseJSXAttribute(context));
        }
    }
    return attributes;
};
Parser.prototype.nextJSXToken = function nextJSXToken () {
    this.token = this.scanJSXToken();
};
Parser.prototype.scanJSXToken = function scanJSXToken () {
        var this$1 = this;

    // Set 'lastIndex' and 'startIndex' to current index
    this.lastIndex = this.startIndex = this.index;
    if (this.consume(60 /* LessThan */)) {
        if (this.nextChar() !== 47 /* Slash */)
            { return 2361151 /* LessThan */; }
        this.advance();
        return 25 /* JSXClose */;
    }
    if (this.consume(123 /* LeftBrace */))
        { return 393228 /* LeftBrace */; }
    while (this.hasNext()) {
        if (this$1.nextChar() === 123 /* LeftBrace */ ||
            this$1.nextChar() === 60 /* LessThan */) {
            break;
        }
        this$1.advance();
    }
    return 116 /* JSXText */;
};
Parser.prototype.parseJSXIdentifier = function parseJSXIdentifier (context) {
    var name = this.tokenValue;
    var pos = this.getLocations();
    this.nextToken(context);
    return this.finishNode(pos, {
        type: 'JSXIdentifier',
        name: name
    });
};
Parser.prototype.parseJSXNamespacedName = function parseJSXNamespacedName (context, namespace, pos) {
    this.expect(context, 21 /* Colon */);
    var name = this.parseJSXIdentifier(context);
    return this.finishNode(pos, {
        type: 'JSXNamespacedName',
        namespace: namespace,
        name: name
    });
};
Parser.prototype.parseJSXMemberExpression = function parseJSXMemberExpression (context, expr, pos) {
    return this.finishNode(pos, {
        type: 'JSXMemberExpression',
        object: expr,
        property: this.parseJSXIdentifier(context)
    });
};
Parser.prototype.parseJSXElementName = function parseJSXElementName (context) {
        var this$1 = this;

    var pos = this.getLocations();
    this.scanJSXIdentifier(context);
    var expression = this.parseJSXIdentifier(context | 8192 /* JSXChild */);
    // Namespace
    if (this.token === 21 /* Colon */)
        { return this.parseJSXNamespacedName(context, expression, pos); }
    // Member expression
    while (this.parseOptional(context, 13 /* Period */)) {
        expression = this$1.parseJSXMemberExpression(context, expression, pos);
    }
    return expression;
};

function parseScript(source, options) {
    if ( options === void 0 ) options = {};

    return new Parser(source, options).parse(0 /* None */);
}
function parseModule(source, options) {
    if ( options === void 0 ) options = {};

    return new Parser(source, options).parse(2 /* Strict */ | 1 /* Module */);
}
function parse(source, options) {
    if ( options === void 0 ) options = {};

    return options && typeof options.sourceType === 'string' && options.sourceType === 'module'
        ? this.parseModule(source, options)
        : this.parseScript(source, options);
}

export { parseScript, parseModule, parse };
