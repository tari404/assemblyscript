(module
 (type $none_=>_none (func))
 (memory $0 0)
 (export "memory" (memory $0))
 (start $start)
 (func $start:scoped (; 0 ;)
  (local $0 i32)
  loop $loop|0
   local.get $0
   i32.const 1
   i32.lt_s
   if
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $loop|0
   end
  end
  i32.const 0
  local.set $0
  loop $loop|1
   local.get $0
   i32.const 1
   i32.lt_s
   if
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $loop|1
   end
  end
 )
 (func $start (; 1 ;)
  call $start:scoped
 )
)
