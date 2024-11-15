import Channel from '../schema/channel.js';
import crudRepository from './crudReository.js';

const channelRepository = {
  ...crudRepository(Channel)
};

export default channelRepository;
