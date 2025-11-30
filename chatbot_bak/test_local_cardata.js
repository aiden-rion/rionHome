// Test script to verify local cardata.txt loading
console.log('Testing local cardata.txt loading...');

// Test the local file loading
fetch('/cardata.txt')
  .then(response => {
    console.log('File Response Status:', response.status);
    if (response.ok) {
      return response.text();
    } else {
      throw new Error(`File request failed with status: ${response.status}`);
    }
  })
  .then(text => {
    console.log('File loaded successfully');
    console.log('File size:', text.length, 'characters');
    
    // Test parsing logic
    const records = text.split('\n').filter(line => line.trim());
    console.log('Number of records found:', records.length);
    
    if (records.length > 0) {
      const firstRecord = records[0];
      const fields = firstRecord.split('^');
      console.log('First record fields count:', fields.length);
      console.log('First few fields:', fields.slice(0, 5));
      
      // Test car data mapping
      if (fields.length >= 3) {
        const sampleCar = {
          id: fields[0] || 'car-0',
          brand: fields[1] || '브랜드 없음',
          model: fields[2] || '모델 없음',
          engine: fields[3] || undefined,
        };
        
        console.log('Sample car data:', sampleCar);
      }
    }
  })
  .catch(error => {
    console.error('Local cardata test failed:', error);
  });