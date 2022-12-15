use neon::{prelude::*, types::JsDate};
use rand::Rng;
use chrono::Local;

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
    // Get the argument first argument as `JsNumber` and convert to fitting 
    let _amount: f64 = cx.argument::<JsNumber>(0)?.value(&mut cx);
    let _length: f64 = cx.argument::<JsNumber>(1)?.value(&mut cx);

    let amount = _amount.round() as u32;
    let length: u32 = _length.round() as u32;

    let array = cx.empty_array();
    let mut rng = rand::thread_rng();
    let date_time = Local::now().timestamp() as f64;

    let mut i: u32 = 0;
    while i < length {
        let summee = i * 1000 / 5 as u32;
        let sum_date = date_time + summee as f64;
        let date_now = JsDate::new(&mut cx, sum_date).unwrap();
    
        let inner_array: Handle<JsArray> = cx.empty_array();
        let mut inner_i: u32 = 0;
        while inner_i < amount {
            let _v = cx.number(rng.gen_range(10.0..55.0));
            inner_array.set(&mut cx, inner_i as u32, _v).unwrap();
            inner_i = inner_i + 1;
        }

        let iterative_object = cx.empty_object();
        iterative_object.set(&mut cx, "x", date_now).unwrap();
        iterative_object.set(&mut cx, "y", inner_array).unwrap();

        array.set(&mut cx, i as u32, iterative_object)?;
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
