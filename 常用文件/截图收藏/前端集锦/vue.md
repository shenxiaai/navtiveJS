## [Vue warn]: Error in render function: “TypeError: Cannot read property 'first_name' of null”

## [Vue warn]: Error in render function: “TypeError: Cannot read property 'first_name' of undefined”

> 都是因为在data中未定义，而在template中引用导致的。
> 可能是：在data中定义了对象，但是是空对象，未声明对象中具体的键值对，而在template中引用的键值。
