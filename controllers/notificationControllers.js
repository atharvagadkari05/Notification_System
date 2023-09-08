import { connect } from "amqplib";
const publishMethod = async(req,res) => {

 try {  
    const service_name = req.body.service;
    const queue_name = req.body.queue;
    const message = req.body.message;

    const connection = await connect("amqps://acwrxsdo:IFcjpjVI6arE2J2GHa-pWfpL4v58tRDO@puffin.rmq2.cloudamqp.com/acwrxsdo")
    const channel = await connection.createChannel();


    const unique_queue = `${service_name}-${queue_name}`

    await channel.assertQueue(unique_queue,{durable:false})

    await channel.sendToQueue(unique_queue, Buffer.from(JSON.stringify(message)))

    await channel.close();
    await connection.close();

    res.send("Message send")}
    catch(e){
        console.log(e.message);
    }

}


const subscriberMethod = async(req,res) =>{
    try{
    const queueID = req.body.queueID;
    const connection = await connect("amqps://acwrxsdo:IFcjpjVI6arE2J2GHa-pWfpL4v58tRDO@puffin.rmq2.cloudamqp.com/acwrxsdo")
    const channel = await connection.createChannel();

    process.once('SIGINT', async()=>{
        await channel.close();
        await connection.close();
    })

    var retrived_message ;

    await channel.consume(queueID,(message)=>{
        if(message){
            retrived_message = JSON.parse(message.content.toString());
            channel.ack(message);
            res.send(retrived_message);
        }
    })
    if(retrived_message==undefined){
        res.send("No new Message ");
    }
}
catch(error){
    console.warn(error)
}

}

export default {publishMethod, subscriberMethod}