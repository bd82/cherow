import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - Directive prologue', () => {

    it('should fail if Use Strict Directive Prologue is "use strict";', () => {
        expect(() => {
            parseScript(`"use strict"; var public = 1;`);
        }).to.throw();
    });

    it('should fail on a Use Strict Directive followed by a strict mode', () => {
        expect(() => {
            parseScript(`"use strict"; eval = 42;`);
        }).to.throw();
    });

    it('should fail on a Use Strict Directive followed by a strict mode wrapped in parenthesis', () => {
        expect(() => {
            parseScript(`("use strict";) eval = 42;`);
        }).to.throw();
    });

    it('should parse simple non-strict directive', () => {
        expect(parseScript('"Hello\\nworld"', {
            locations: true,
            raw: true,
            ranges: true,
            directives: true
        })).to.eql({
              "body": [
                {
                  "directive": "Hello\\nworld",
                  "end": 14,
                  "expression": {
                    "end": 14,
                    "loc": {
                      "end": {
                        "column": 14,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      }
                    },
                    "raw": "\"Hello\\nworld\"",
                    "start": 0,
                    "type": "Literal",
                    "value": "Hello\nworld",
                  },
                  "loc": {
                    "end": {
                      "column": 14,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    },
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                },
              ],
              "end": 14,
              "loc": {
                "end": {
                  "column": 14,
                  "line": 1,
                },
                "start": {
                 "column": 0,
                  "line": 1,
                },
              },
              "sourceType": "script",
              "start": 0,
              "type": "Program",
            });
    });

    it('should parse hexadecimal directive', () => {
        expect(parseScript('"\\x61"', {
            locations: true,
            raw: true,
            ranges: true,
            directives: true
        })).to.eql({
              "body": [
                {
                  "directive": "\\x61",
                  "end": 6,
                  "expression": {
                    "end": 6,
                    "loc": {
                      "end": {
                       "column": 6,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      }
                    },
                    "raw": "\"\\x61\"",
                    "start": 0,
                    "type": "Literal",
                    "value": "a",
                  },
                  "loc": {
                    "end": {
                      "column": 6,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 6,
              "loc": {
                "end": {
                  "column": 6,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should octal directives', () => {
        expect(parseScript('"Hello\\412World"', {
            locations: true,
            raw: true,
            ranges: true,
            directives: true
        })).to.eql({
              "body": [
                {
                  "directive": "Hello\\412World",
                  "end": 16,
                  "expression": {
                    "end": 16,
                    "loc": {
                      "end": {
                        "column": 16,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      }
                    },
                    "raw": "\"Hello\\412World\"",
                    "start": 0,
                    "type": "Literal",
                    "value": "Hello!2World",
                  },
                  "loc": {
                    "end": {
                      "column": 16,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                  "start": 0,
                  "type": "ExpressionStatement",
                }
              ],
              "end": 16,
              "loc": {
                "end": {
                  "column": 16,
                  "line": 1,
                },
                "start": {
                 "column": 0,
                  "line": 1,
                }
              },
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });

    it('should have no directive node if "directives" are enabled and no directive prologue', () => {
        expect(parseScript('1', {
            locations: true,
            raw: true,
            ranges: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 1,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 1
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 1,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 1
                  }
                },
                "expression": {
                  "type": "Literal",
                  "start": 0,
                  "end": 1,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 1
                    }
                  },
                  "value": 1,
                  "raw": "1"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse directive in func expr body', () => {
        expect(parseScript('(function() {\'use strict\';return 0;});', {
            raw: true,
            directives: true
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "async": false,
                    "body": {
                      "body": [
                        {
                          "directive": "use strict",
                          "expression": {
                            "raw": "'use strict'",
                            "type": "Literal",
                            "value": "use strict",
                          },
                         "type": "ExpressionStatement",
                        },
                       {
                          "argument": {
                           "raw": "0",
                            "type": "Literal",
                           "value": 0,
                          },
                          "type": "ReturnStatement"
                        }
                      ],
                      "type": "BlockStatement",
                    },
                    "expression": false,
                    "generator": false,
                    "id": null,
                    "params": [],
                   "type": "FunctionExpression"
                  },
                  "type": "ExpressionStatement"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse if Use Strict Directive Prologue contain a EscapeSequence', () => {
        expect(parseScript('"use\\u0020strict"; eval = 42;', {
            locations: true,
            raw: true,
            ranges: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 29,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 29
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "directive": "use\\u0020strict",
                "expression": {
                  "type": "Literal",
                  "start": 0,
                  "end": 17,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 17
                    }
                  },
                  "value": "use strict",
                  "raw": "\"use\\u0020strict\""
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 19,
                "end": 29,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 19
                  },
                  "end": {
                    "line": 1,
                    "column": 29
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 19,
                  "end": 28,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 19
                    },
                    "end": {
                      "line": 1,
                      "column": 28
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 19,
                    "end": 23,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 19
                      },
                      "end": {
                        "line": 1,
                        "column": 23
                      }
                    },
                    "name": "eval"
                  },
                  "right": {
                    "type": "Literal",
                    "start": 26,
                    "end": 28,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 26
                      },
                      "end": {
                        "line": 1,
                        "column": 28
                      }
                    },
                    "value": 42,
                    "raw": "42"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse if Use Strict Directive Prologue is wrapped inside parenthesis', () => {
        expect(parseScript('("use strict"); eval = 42;', {
            locations: true,
            raw: true,
            ranges: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 26,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 26
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 15,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 15
                  }
                },
                "expression": {
                  "type": "Literal",
                  "start": 1,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "value": "use strict",
                  "raw": "\"use strict\""
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 16,
                "end": 26,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 16
                  },
                  "end": {
                    "line": 1,
                    "column": 26
                  }
                },
                "expression": {
                  "type": "AssignmentExpression",
                  "start": 16,
                  "end": 25,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 1,
                      "column": 25
                    }
                  },
                  "operator": "=",
                  "left": {
                    "type": "Identifier",
                    "start": 16,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "name": "eval"
                  },
                  "right": {
                    "type": "Literal",
                    "start": 23,
                    "end": 25,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 23
                      },
                      "end": {
                        "line": 1,
                        "column": 25
                      }
                    },
                    "value": 42,
                    "raw": "42"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse if Use Strict Directive Prologue is "USE STRICT"', () => {
        expect(parseScript('"USE STRICT";  var public = 1;', {
            locations: false,
            raw: true,
            ranges: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 13,
                "directive": "USE STRICT",
                "expression": {
                  "type": "Literal",
                  "start": 0,
                  "end": 12,
                  "value": "USE STRICT",
                  "raw": "\"USE STRICT\""
                }
              },
              {
                "type": "VariableDeclaration",
                "start": 15,
                "end": 30,
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 19,
                    "end": 29,
                    "id": {
                      "type": "Identifier",
                      "start": 19,
                      "end": 25,
                      "name": "public"
                    },
                    "init": {
                      "type": "Literal",
                      "start": 28,
                      "end": 29,
                      "value": 1,
                      "raw": "1"
                    }
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "use\\x20strict""', () => {
        expect(parseScript('"use\\x20strict"', {
            locations: false,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict",
                        "raw": "\"use\\x20strict\"",
                    },
                    "directive": "use\\x20strict",
                }
            ],
            "sourceType": "script",
        });
    });

    it('should parse "use asm" + semi + "use strict"', () => {
        expect(parseModule('"use strict"; 1', {
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
              {
                "type": "ExpressionStatement",
                "expression": {
                  "type": "Literal",
                  "value": "use strict",
                  "raw": "\"use strict\"",
                },
                "directive": "use strict",
              },
              {
                "type": "ExpressionStatement",
                "expression": {
                  "type": "Literal",
                  "value": 1,
                  "raw": "1",
                },
              }
            ],
            "sourceType": "module",
          });
    });

    it('should parse "use asm" + semi + "use strict"', () => {
        expect(parseScript('"use asm"; "use strict"', {
            locations: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": "use asm",
                        "raw": "\"use asm\"",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        }
                    },
                    "directive": "use asm",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 10
                        }
                    }
                },
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict",
                        "raw": "\"use strict\"",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 11
                            },
                            "end": {
                                "line": 1,
                                "column": 23
                            }
                        }
                    },
                    "directive": "use strict",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 11
                        },
                        "end": {
                            "line": 1,
                            "column": 23
                        }
                    }
                }
            ],
            "sourceType": "script",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 23
                }
            }
        });
    });

    it('should parse "function wrap() { "use asm"; "use strict"; foo }"', () => {
        expect(parseScript('function wrap() { "use asm"; "use strict"; foo }', {
            locations: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "wrap",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        }
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use asm",
                                    "raw": "\"use asm\"",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 18
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    }
                                },
                                "directive": "use asm",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 28
                                    }
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use strict",
                                    "raw": "\"use strict\"",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 29
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 41
                                        }
                                    }
                                },
                                "directive": "use strict",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 29
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 42
                                    }
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Identifier",
                                    "name": "foo",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 43
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 46
                                        }
                                    }
                                },
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 43
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 46
                                    }
                                }
                            }
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 48
                            }
                        }
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 48
                        }
                    }
                }
            ],
            "sourceType": "script",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 48
                }
            }
        });
    });
    it('should parse "function wrap() { "use asm"; "use strict"; foo }"', () => {
        expect(parseScript('function wrap() { "use asm"; "use strict"; foo }', {
            locations: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "wrap",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        }
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use asm",
                                    "raw": "\"use asm\"",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 18
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    }
                                },
                                "directive": "use asm",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 28
                                    }
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use strict",
                                    "raw": "\"use strict\"",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 29
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 41
                                        }
                                    }
                                },
                                "directive": "use strict",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 29
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 42
                                    }
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Identifier",
                                    "name": "foo",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 43
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 46
                                        }
                                    }
                                },
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 43
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 46
                                    }
                                }
                            }
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 48
                            }
                        }
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 48
                        }
                    }
                }
            ],
            "sourceType": "script",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 48
                }
            }
        });
    });

    it('should parse one string after other expressions', () => {
        expect(parseScript('"use asm"; foo; "use strict";', {
            locations: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": "use asm",
                        "raw": "\"use asm\"",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        }
                    },
                    "directive": "use asm",
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 10
                        }
                    }
                },
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Identifier",
                        "name": "foo",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 11
                            },
                            "end": {
                                "line": 1,
                                "column": 14
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 11
                        },
                        "end": {
                            "line": 1,
                            "column": 15
                        }
                    }
                },
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict",
                        "raw": "\"use strict\"",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 28
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 16
                        },
                        "end": {
                            "line": 1,
                            "column": 29
                        }
                    }
                }
            ],
            "sourceType": "script",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 29
                }
            }
        });
    });

    it('should parse use strict in the body of a function', () => {
        expect(parseScript('function wrap() { "use asm"; foo; "use strict" }', {
            locations: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "wrap",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        }
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use asm",
                                    "raw": "\"use asm\"",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 18
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    }
                                },
                                "directive": "use asm",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 28
                                    }
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Identifier",
                                    "name": "foo",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 29
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 32
                                        }
                                    }
                                },
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 29
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 33
                                    }
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use strict",
                                    "raw": "\"use strict\"",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 34
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 46
                                        }
                                    }
                                },
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 34
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 46
                                    }
                                }
                            }
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 48
                            }
                        }
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 48
                        }
                    }
                }
            ],
            "sourceType": "script",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 48
                }
            }
        });
    });

    it('should parse one string in a block', () => {
        expect(parseScript('{ "use strict"; }', {
            locations: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "Literal",
                                "value": "use strict",
                                "raw": "\"use strict\"",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 2
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 14
                                    }
                                }
                            },
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 2
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        }
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 17
                        }
                    }
                }
            ],
            "sourceType": "script",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 17
                }
            }
        });
    });

    it('should parse one string with parentheses.', () => {
        expect(parseScript('function wrap() { ( "use strict"); foo }', {
            locations: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "wrap",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        }
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use strict",
                                    "raw": "\"use strict\"",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 20
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 32
                                        }
                                    }
                                },
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 34
                                    }
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Identifier",
                                    "name": "foo",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 35
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 38
                                        }
                                    }
                                },
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 35
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 38
                                    }
                                }
                            }
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 40
                            }
                        }
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 40
                        }
                    }
                }
            ],
            "sourceType": "script",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 40
                }
            }
        });
    });

    it('should test that innocuous string that evaluates to `use strict` is not promoted to Use Strict directive', () => {
        expect(parseScript('"use\\x20strict"; with (x) foo = bar;', {
            raw: true,
        })).to.eql({
              "body": [
                {
                  "expression": {
                    "raw": "\"use\\x20strict\"",
                    "type": "Literal",
                    "value": "use strict",
                  },
                  "type": "ExpressionStatement"
                },
                {
                  "body": {
                    "expression": {
                      "left": {
                        "name": "foo",
                        "type": "Identifier",
                      },
                      "operator": "=",
                      "right": {
                       "name": "bar",
                        "type": "Identifier"
                      },
                      "type": "AssignmentExpression"
                    },
                   "type": "ExpressionStatement"
                  },
                 "object": {
                    "name": "x",
                    "type": "Identifier"
                  },
                  "type": "WithStatement"
                }
             ],
              "sourceType": "script",
              "type": "Program"
            });
    });

    it('should parse function in a default parameter"', () => {
        expect(parseScript('function a() { "use strict" } "use strict"; foo', {
            locations: true,
            raw: true,
            directives: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "a",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 10
                            }
                        }
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use strict",
                                    "raw": "\"use strict\"",
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    }
                                },
                                "directive": "use strict",
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                }
                            }
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 13
                            },
                            "end": {
                                "line": 1,
                                "column": 29
                            }
                        }
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 29
                        }
                    }
                },
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict",
                        "raw": "\"use strict\"",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 30
                            },
                            "end": {
                                "line": 1,
                                "column": 42
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 30
                        },
                        "end": {
                            "line": 1,
                            "column": 43
                        }
                    }
                },
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Identifier",
                        "name": "foo",
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 44
                            },
                            "end": {
                                "line": 1,
                                "column": 47
                            }
                        }
                    },
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 44
                        },
                        "end": {
                            "line": 1,
                            "column": 47
                        }
                    }
                }
            ],
            "sourceType": "script",
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 47
                }
            }
        });
    });
});