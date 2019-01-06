const keys = require('./keys');

const redisClient = redis.createClient({
    host:  keys.REDIS_HOST,
    port: keys.REDIS_PORT,
    retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

function fib(index){
    if(index<2) return 1;
    return fib(index-1) + finb(index-2);
}

sub.on('message', (channel, message) => {
    redisClient.hset('values', message, fib(parseInt(message)))
});

sub.subscribe('insert');