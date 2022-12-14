use neon::prelude::*;
use rand::Rng;

fn get_num_cpus(mut cx: FunctionContext) -> JsResult<JsNumber> {
    Ok(cx.number(num_cpus::get() as f64))
}

fn create_pair(mut cx: FunctionContext) -> JsResult<JsObject> {
    let x: Handle<JsValue> = cx.argument(0)?;
    let y: Handle<JsValue> = cx.argument(1)?;

    let obj = cx.empty_object();

    obj.set(&mut cx, "x", x)?;
    obj.set(&mut cx, "y", y)?;

    Ok(obj)
}

fn stream(mut cx: FunctionContext) -> JsResult<JsArray> {
    let _amount: Handle<JsValue> = cx.argument(0)?;
    let array = cx.empty_array();
    let mut rng = rand::thread_rng();


    let mut i = 0;
    while i < 1000 {
        
        let v = cx.number(rng.gen_range(10.0..55.0));
        array.set(&mut cx, i as u32, v)?;
        i = i + 1;
    }

    Ok(array)
}



#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("get", get_num_cpus)?;
    cx.export_function("toObj", create_pair)?;
    cx.export_function("stream", stream)?;
    Ok(())
}
